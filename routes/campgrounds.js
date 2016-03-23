var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware")

//index
router.get("/", function(req, res){
    Campground.find({/*ALL*/}, function(err, CGs){
        if(err) {
            console.log(err);
        } else {
            console.log("finds success\n"+CGs);
            res.render("campgrounds/campgrounds", {eCGs : CGs, currentUser : req.user});
        }
    });
});

//new
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

//create
router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.create(
    {
        name : req.body.name, 
        img : req.body.img,
        des : req.body.des,
        author : {
            id : req.user._id,
            username : req.user.username
        }
    }, function(err, cg){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
            console.log("creation success\n"+cg);
        }
    });
});


//show
router.get("/:id", function(req, res){
    console.log("Taken to the show route");
    Campground.findById(req.params.id).populate("comments").exec(function(err, cg){
        if(err) {
            console.log(err);
        } else {
            console.log(cg);
            res.render("campgrounds/show", {eCG : cg});
        }
    });
    console.log("finished show req");
});

//edit
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground : foundCampground});
    });
});

//update
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.cg, function(err, campground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

//destroy
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Deleted campground.");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;