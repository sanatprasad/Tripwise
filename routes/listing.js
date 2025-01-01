const express = require("express");
const router = express.Router();


let Listing=require("../models/listing.js");
const ExpressError = require("../utils/ExpressError");
const {isLoggedIn, isOwner} = require("../middleware.js");
const ListingControler = require("../controllers/listing.js");
const multer = require("multer");
const {storage}= require("../cloudContent.js");
const upload = multer({storage});
// Some Function


const wrapAsync = (fn) => {
    return function(req, res, next) {
        fn(req, res, next).catch(next);
    };
};


// Some Function


router.get("/",ListingControler.index);

// Create Router
router.post("/",isLoggedIn,upload.single("image"),wrapAsync(ListingControler.CreateListings));

// Create New Listing
router.get("/new",isLoggedIn,ListingControler.RenderNewForm);

// get destination
router.post("/destination",ListingControler.ShowDestination);

// show listings
router.get("/:id",ListingControler.ShowAllListings);

router.post("/:id/ticket",isLoggedIn,ListingControler.SupplyTicket);
// edit Listing
router.get("/:id/edit",isLoggedIn,isOwner,ListingControler.EditListing);

router.get("/:id/ConfirmBooking",isLoggedIn,ListingControler.ConfirmBooking);

// update Listing
router.put("/:id" ,isLoggedIn,isOwner,upload.single("image"), ListingControler.UpdateListing);

// delete Listing
router.delete("/:id",isLoggedIn,isOwner,ListingControler.DeleteListing);


module.exports = router;