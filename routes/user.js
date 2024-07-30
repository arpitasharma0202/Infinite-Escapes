const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressErrors.js");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");

router.route("/signup")
    .get(userController.renderSignupform)
    .post( wrapAsync(userController.signup));


router.route("/login")
    .get( userController.renderloginform)
    .post(
        saveRedirectUrl,
        passport.authenticate("local",{
            failureRedirect:"/login",
            failureFlash:true,
        }),
        userController.login
    );
    
router.get("/logout" , userController.logout);

module.exports =  router;
