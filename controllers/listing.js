
const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const maptoken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: maptoken });
const mongoose = require('mongoose');
const { Types } = mongoose;

let tagList = ["Iconic-Cities","Mountain","Castles","Camping","Farms","Domes","Artic","Forest","Beach"];


module.exports.index = async (req,res)=>{
    const all = await Listing.find({});
    res.render("listing/index.ejs",{all});
}

module.exports.ShowAllListings = async(req,res)=>{
    let {id}=req.params;
    let q=id;
    const all = await Listing.find({});
    console.log(q);
    if (tagList.includes(q)) {
        return res.render("listing/taggedlist.ejs",{all,q});
    }
    if (!Types.ObjectId.isValid(id)) {
        req.flash("error","Listing you requested for does not Exist !!!");
            return res.redirect("/listing");
    }
    let obj1=await Listing.findById(id);
    console.log(obj1);
    if(obj1===null)
        {
            req.flash("error","Listing you requested for does not Exist !!!");
            return res.redirect("/listing");
        }
    console.log("OK Ph - 3");
    let obj=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    res.render("listing/show.ejs",{obj});
}

module.exports.RenderNewForm = (req,res)=>{
    
    res.render("listing/new.ejs");
}

module.exports.CreateListings = async(req,res,next)=>{
    // let {title,loc,country,price,image,description}=req.body;
    // console.log(req.body);
    // console.log(req.file);
    let response = await geocodingClient.forwardGeocode({
            query: req.body.loc,
            limit: 1,
          })
            .send()
        //     // 
    let url = req.file.path;
    let filename =req.file.filename;
    let newlst=new Listing(req.body);
    newlst.owner = req.user._id;
    newlst.image={url,filename};
    newlst.geometry = response.body.features[0].geometry;
    await newlst.save();
    console.log(newlst);
    req.flash("success","New List Created Sucess !!!");
    res.redirect("/listing");
}

module.exports.EditListing = async(req,res)=>{
    let {id}=req.params;
    let obj=await Listing.findById(id);
    console.log(obj);
    if(obj===null)
        {
            req.flash("error","Listing you requested for does not Exist !!!");
            return res.redirect("/listing");
        }
    let originalImgURL = obj.image.url;
    originalImgURL = originalImgURL.replace("/upload","/upload/h_300,w_250")
    res.render("listing/edit.ejs",{obj,originalImgURL});
    // console.log({obj});
}

module.exports.UpdateListing = async(req,res)=>{
    let {id}=req.params;
    
    let listing =await Listing.findByIdAndUpdate(id,{...req.body});
    if(typeof req.file !=="undefined")
    {
    let url = req.file.path;
    let filename =req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }
    // console.log(req.body);
    req.flash("success","Listing Updated Sucessfully !!!");
    res.redirect(`/listing/${id}`);
}

module.exports.DeleteListing = async(req,res)=>{
    let {id}=req.params;
    let x=await Listing.findOneAndDelete({_id:id});
    req.flash("success","List Deleted Sucessfully !!!");
    res.redirect("/listing");
}

module.exports.ShowDestination = async(req,res)=>{
    let {destination} = req.body;
    const all = await Listing.find({});
    console.log(destination);
    res.render("listing/destination.ejs",{all,destination});
}

module.exports.ConfirmBooking= async(req,res)=>{
    let {id}=req.params;
    let x=await Listing.findOne({_id:id});
    return res.render("listing/booking.ejs",{x,id});
}



module.exports.SupplyTicket = async(req,res)=>{
    let {id}=req.params;
    let user_data = req.body;
    let x=await Listing.findOne({_id:id});
    console.log(id,'\n',user_data,'\n',x);
    res.render("listing/ticket.ejs",{x,id,user_data});
    // return res.render("listing/booking.ejs",{x,id});
}