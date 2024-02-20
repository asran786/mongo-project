const express = require("express")
const router = express.Router();
const UserData = require("../models/user.js");
const asyncWrap = require("../utils/asyncWrap.js");
const passport = require("passport");
const dbConnect = require("../models/dbConnection.js")
router.get("/signup", (req, res) => {
    res.render("users/signUp")
})
router.post("/signup", asyncWrap(async(req, res) => {

    const { username, password, email } = req.body;
    const newUser = new UserData({ username, email });
    const registerUser = await UserData.register(newUser, password)
    req.login(registerUser, (err) => {
        if (err) { return next(err); }

        req.flash("success", "welcome to wonderLust")
        res.redirect("/listing")
    })


}))

router.get("/login", (req, res) => {
    res.render("users/login")
})

router.post("/login", passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), async(req, res) => {

    res.redirect("/listing")

});

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err)
        }
        req.flash("success", "successfully log out ")
        res.redirect("/listing")
    })
})
module.exports = router;