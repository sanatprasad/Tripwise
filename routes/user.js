const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectURL } = require("../middleware.js");
const UserControler = require("../controllers/user.js");

router.route("/signup")
    .get( UserControler.RenderToSignUpForm)
    .post( UserControler.FillSignUpForm);


router.route("/login")
    .get( UserControler.RenderToLoginForm)
    .post( saveRedirectURL, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), UserControler.ValidateLogin);


router.get("/logout", UserControler.LogOut);


module.exports = router;