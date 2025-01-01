const mongoose = require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose= require("passport-local-mongoose");

const userSchm = new Schema({
    email:{
        type:String,
        requiresd:true,
    }
});

userSchm.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchm);