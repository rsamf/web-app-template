var express= require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

router.get("/", function(req, res){
    res.render("index");
});


//Auth Routes
router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    User.register(new User({
        username: req.body.username
    }), req.body.password, function(err, user){
        if(err) {
            req.flash(err.message);
            return res.render("register");
        } else {
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to YelpCamp, "+user.username);
                res.redirect("/campgrounds");
            });
        }
    });
});

router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect : "/campgrounds",
    failureRedirect : "/login"
}), function(req, res){
    
});

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You have been logged out.");
    res.redirect("/campgrounds");
});

module.exports = router;