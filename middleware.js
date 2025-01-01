const Listing = require("./models/listing.js");
const Review = require("./models/reviews.js");

module.exports.isLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated())
        {
            req.session.redirectURL = req.originalUrl;
            req.flash("error","You need to logged in first to peform the action !!");
            return res.redirect("/login");
        }
    next();
}

module.exports.saveRedirectURL = (req,res,next) =>{
    if(req.session.redirectURL)
    {
        res.locals.redirectURL=req.session.redirectURL;
    }
    next();
}

module.exports.isOwner = async(req,res,next)=>{
    let {id}=req.params;
    let lst = await Listing.findById(id);
    if(!lst.owner.equals(res.locals.curUser._id))
    {
        req.flash("error","You have no access to peform the following action");
        return res.redirect(`/listing/${id}`);
    }
    next();
}

module.exports.isAuthor = async(req,res,next)=>{
    let {id,reviewId} = req.params;
    let lst = await Review.findById(reviewId);
    if(!lst.author.equals(res.locals.curUser._id))
    {
        req.flash("error","You have no access to peform the following action");
        return res.redirect(`/listing/${id}`);
    }
    next();
}