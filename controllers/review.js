const Review = require("../models/reviews.js");
let Listing=require("../models/listing.js");

module.exports.AddReview = async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let nwRev = new Review(req.body);
    nwRev.author = req.user._id;
    listing.reviews.push(nwRev);
    await nwRev.save();
    await listing.save();
    // req.body.Review
    
    req.flash("success","New Review Created !!!")
    // console.log(listing);
    res.redirect(`/listing/${req.params.id}`);
}

module.exports.DeleteReview = async(req,res) =>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{ $pull : {reviews : reviewId }});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted !!!")
    res.redirect(`/listing/${id}`);
} 