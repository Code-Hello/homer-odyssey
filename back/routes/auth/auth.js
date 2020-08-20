require("dotenv").config();
const connection = require("../../helpers/db");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy;

const secret = process.env.SECRET;
const hash = Number(process.env.HASH);

passport.use(
    new LocalStrategy({
            usernameField: "email",
            passwordField: "password",
            session: false,
        },
        function(email, password, done) {
            console.log(email);
            console.log(password);
            connection.query("SELECT * FROM users WHERE email=?", email, function(
                err,
                user
            ) {
                if (err) {
                    return done(err);
                }
                if (!user || user.length <= 0 || !validatePassword(user, password)) {
                    return done(null, false, { message: "Incorrect email or password." });
                }
                return done(null, user);
            });
        }
    )
);

passport.use(
    new JwtStrategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secret,
        },
        function(jwtPayload, cb) {
            return cb(null, jwtPayload);
        }
    )
);

const validatePassword = (user, password) => {
    return bcrypt.compareSync(password, user[0].password);
};

// router.post(
//     "/signin",
//     passport.authenticate("local", {
//         successRedirect: "/",
//         failureRedirect: "/signin",
//         failureFlash: true,
//         successFlash: "Welcome!",
//         session: false,
//     }),
//     function(req, res) {}
// );

router.post("/signin", function(req, res, next) {
    console.log(req.body);
    passport.authenticate("local", function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect("/signin");
        }
        req.logIn(user, { session: false }, function(err) {
            if (err) {
                return next(err);
            }
            let userTemp = JSON.parse(JSON.stringify(user[0]));
            let payload = {
                id: userTemp.id,
                email: userTemp.email,
                name: userTemp.name,
                lastname: userTemp.lastname,
            };
            const token = jwt.sign(payload, secret, { expiresIn: "1h" });
            console.log(token);
            return res.status(200).json({ payload, token, flash: "User sign in !" });
            // return res.redirect("/user/" + user[0].name);
        });
    })(req, res);
});

router.post("/signup", function(req, res, next) {
    let user = req.body;
    user.password = bcrypt.hashSync(user.password, hash);
    connection.query("INSERT INTO users SET ?", user, function(
        error,
        results,
        fields
    ) {
        if (error) res.status(500).json({ flash: error.message });
        else {
            let payload = {
                email: user.email,
                name: user.name,
                lastname: user.lastname,
            };
            const token = jwt.sign(payload, secret, { expiresIn: "1h" });
            res.status(200).json({ payload, token, flash: "User has been signed up !" })
        };
        res.end();
    });
});

module.exports = router;