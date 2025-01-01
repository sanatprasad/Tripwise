if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
// ----------------------------------------------- Base  Code ----------------------------------------------- //

let exp=require("express");
let app=exp();
const port=8080;
let path=require("path");
const ejsmate=require("ejs-mate");

let meth=require("method-override");
app.use(meth("_method"));
app.engine("ejs",ejsmate);

app.use(exp.urlencoded({extended:true}));
app.use(exp.json());

app.set("view engine","ejs");

app.set("views",path.join(__dirname , "views"));
app.use(exp.static(path.join(__dirname,"public")));

app.listen(port,()=>{
    console.log("The port has been activated sucessfully");
})


// ----------------------------------------------- Base  Code ----------------------------------------------- //


// ----------------------------------------------- Mongo Conn ----------------------------------------------- //

const mongoose = require("mongoose");
// const Mongo_url="mongodb://127.0.0.1:27017/wanderlust";
const dbURL = process.env.ATLASDB_URL;

main()
    .then((res) => { console.log("Sucess") })
    .catch((err) => console.log("Error Occured At Mongoose"));



async function main() {
    await mongoose.connect(dbURL);
}

// ----------------------------------------------- Mongo Conn ----------------------------------------------- //


// ----------------- Requiring Some imps ------------------------------

const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


// -------Routes--------

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const store = MongoStore.create({
    mongoUrl:dbURL,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
});


store.on("error",()=>{
    console.log("Error in Mongo Session Store ",err)
})


const sessionOpt = {
    store:store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now() + 7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    },
};



// ----------Calling localhost 8080----------------
app.get("/",(req,res)=>{
    res.redirect("/listing");
});

app.use(session(sessionOpt));
app.use(flash())


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.curUser = req.user;
    next();
})


// --------Using Routes -----------

app.use("/",userRouter);
app.use("/listing",listingsRouter);
app.use("/listing/:id/reviews",reviewsRouter);


// atharv22210392 : wT0sEZtARQahFUnX
// mongodb+srv://atharv22210392:<password>@atharv.jwxn1xq.mongodb.net/?retryWrites=true&w=majority&appName=Atharv
//mongodb+srv://atharv22210392:wT0sEZtARQahFUnX@atharv.jwxn1xq.mongodb.net/?retryWrites=true&w=majority&appName=Atharv