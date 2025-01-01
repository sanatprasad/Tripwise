
// ----------------------------------------------- Mongo Conn ----------------------------------------------- //

const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const revSch = new Schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5,
    },
    created:{
        type:Date,
        default: Date.now(),
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
});

module.exports = mongoose.model("Review",revSch);