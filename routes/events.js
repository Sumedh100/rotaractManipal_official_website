var express = require("express");
var router  = express.Router();
var Event   = require("../models/event");

router.get("/", function(req, res){
    // res.render("events", {events: events});
    Event.find({}, function(err, allEvents){
        if(err){
            console.log(err);
        }
        else{
            res.render("events", {events: allEvents});
        }
    });
});

router.get("/new",isLoggedIn, function(req, res) {
   res.render("new"); 
});

router.post("/", isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var date = req.body.date;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    
    var newEvent = {name : name, image:image, date: date, description: description, author: author};
    
    Event.create(newEvent, function(err, newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/events");
        }
    });
});

router.get("/:id", function(req, res){
    Event.findById(req.params.id, function(err, foundEvent){
        if(err){
            console.log(err);
        }
        else{
            res.render("show", {event : foundEvent});
        }
    });
});

//Edit event Route
router.get("/:id/edit", checkEventOwnership, function(req, res){
    Event.findById(req.params.id, function(err, foundEvent){
        if(err){
            console.log(err);
        }
        res.render("events/edit", {event: foundEvent});
    });
});

//Update event route

router.put("/:id", checkEventOwnership, function(req, res){
   Event.findByIdAndUpdate(req.params.id, req.body.event, function(err, updatedEvent){
       if(err){
           res.redirect("/events");
       } else {
           res.redirect("/events/" + req.params.id);
       }
   }); 
});

//Destroy Event Route

router.delete("/:id", checkEventOwnership, function(req, res){
    Event.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/events");
        }
        res.redirect("/events");
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function checkEventOwnership(req, res, next){
    if(req.isAuthenticated()){
        Event.findById(req.params.id, function(err, foundEvent){
            if(err){
                res.redirect("back");
            } else{
                if(foundEvent.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

module.exports = router;