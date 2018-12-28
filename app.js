var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    Event          = require("./models/event"),
    User           = require("./models/user");
    
//requiring routes   
var eventRoutes = require("./routes/events"),
    indexRoutes  = require("./routes/index");

mongoose.connect('mongodb://localhost:27017/rotaract_manipal_db', {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Steve Jobs is the greatest entrepreneur of all time!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //this method comes with passport local mongoose
passport.serializeUser(User.serializeUser());     //This too..
passport.deserializeUser(User.deserializeUser()); //this as well...

app.use(function(req, res, next){
    res.locals.currentUser = req.user; //whatever we put inside res.locals is what's available in our template.....here making "user" available to all ejs files
    next();
});


app.use(indexRoutes);
app.use("/events", eventRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Online");
});