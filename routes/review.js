const express = require("express");
const router = express.Router({mergeParams:true});


const ExpressError = require("../utils/ExpressError");
let Review=require("../models/reviews.js");
let Listing=require("../models/listing.js");
const { isLoggedIn, isAuthor } = require("../middleware.js");
// Some Function
const ReviewControler = require("../controllers/review.js")

const wrapAsync = (fn) => {
    return function(req, res, next) {
        fn(req, res, next).catch(next);
    };
};


// Some Function



// post route
router.post("/" ,isLoggedIn, wrapAsync(ReviewControler.AddReview));


// Delete Review
router.delete("/:reviewId",isLoggedIn,isAuthor, wrapAsync( ReviewControler.DeleteReview ));



module.exports = router;