var express = require("express");
var router  = express.Router();
var User    = require("../models/user");
var passport= require("passport");

router.get("/", function(req, res){
    res.render("landing");
});

router.get("/home", function(req, res){
    res.render("home");
});

router.get("/about", function(req, res){
    res.render("about");
});

//Authentication Routes

router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/events");
        });
    });
});

router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/events",
        failureRedirect: "/login"
    }), function(req, res){
});

router.get("/logout", function(req, res) {
    req.logout(); //got this for free from passport...made life way easier
    res.redirect("/events");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;