require("dotenv").config();
const http = require("http");
const path = require("path");
const express = require("express");
const app = express();
const morgan = require("morgan");
const passport = require("passport");

const authRouter = require("./routes/auth/auth");

app.use(morgan("dev"));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.static(__dirname + "/public"));
app.use(passport.initialize());
app.use("/auth", authRouter);

app.get("/profile", passport.authenticate("jwt", { session: false }), function(
    req,
    res
) {
    res.send(req.user);
});

app.get("/", (req, res) => {
    res.send("youhou");
});
/// dans le cas d'une route non trouvée, je retourne le code 404 'Not Found'
app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//je lance le serveur node
let server = app.listen(process.env.PORT || 5000, function() {
    console.log("Listening on port " + server.address().port);
});