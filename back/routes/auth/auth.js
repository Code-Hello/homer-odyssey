const express = require("express");
const router = express.Router();
const connection = require("../../helpers/db");

router.post("/signup", function(req, res, next) {
    const user = req.body;
    connection.query("INSERT INTO users SET ?", user, function(
        error,
        results,
        fields
    ) {
        if (error) res.status(500).json({ flash: error.message });
        else res.status(200).json({ flash: "User has been signed up !" });
        res.end();
    });
});

module.exports = router;