const User = require("../models/user.js");

const passport = require("passport");

module.exports.RenderToSignUpForm = (req,res)=>{
    return res.render("users/signup.ejs");
};

module.exports.FillSignUpForm = async(req,res)=>{
    try{
        let {username,password,email}=req.body;
        const nwuser = new User({email,username});
        const rgUser = await User.register(nwuser,password);
        console.log(rgUser);
        req.login(rgUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Well-Come to WanderLust");
            res.redirect("/listing");
        });
        
    }catch(e)
    {
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.RenderToLoginForm = (req,res)=>{
    return res.render("users/login.ejs");
};

module.exports.ValidateLogin = async(req,res)=>{
    req.flash("success","Well-Come back to Wanderlust");
    let redU=res.locals.redirectURL || "/listing";
    res.redirect(redU);
};

module.exports.LogOut = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Logout Successful");
        res.redirect("/listing");
    });
};