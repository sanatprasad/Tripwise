const mongoose = require("mongoose");
const Mongo_url="mongodb://127.0.0.1:27017/wanderlust";
let Listing=require("../models/listing.js");
let initdata=require("./data.js");


main()
    .then((res) => { console.log("Sucess") })
    .catch((err) => console.log("Error Occured At Mongoose"));


async function main() {
    await mongoose.connect(Mongo_url);
}


const initDb=async()=>{
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({...obj , owner:"6695654ea6df13b70952d643"}))
    await Listing.insertMany(initdata.data);
    console.log("Data Was Initilized");
}

initDb();
