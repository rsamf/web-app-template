var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")

var data = [{
    name : "Apple",
    img : "http://weknowyourdreamz.com/images/apple/apple-01.jpg",
    des : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse porta arcu eu dui fermentum, in luctus ex viverra. Maecenas posuere tellus quis quam pretium congue. Etiam scelerisque cursus sagittis. Integer laoreet fringilla lectus vitae scelerisque. Vivamus mollis, orci eu congue dapibus, ante risus porta lectus, condimentum vehicula lectus mi a nibh. Curabitur lobortis massa in arcu dictum, efficitur lobortis dui sagittis. Quisque pellentesque ullamcorper nibh, eu bibendum quam tincidunt vel. Suspendisse potenti. Quisque dapibus aliquet est, vel eleifend nunc consectetur sit amet. Fusce luctus finibus justo eget ornare. Etiam venenatis odio nec scelerisque pulvinar. Pellentesque convallis eros sed odio viverra, vel ullamcorper magna eleifend. In vestibulum accumsan nisi eget ultrices."
},{
    name : "Pear",
    img: "http://www.gourmetegypt.com/media/catalog/product/p/e/pear-imported-united_1.jpg",
    des : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse porta arcu eu dui fermentum, in luctus ex viverra. Maecenas posuere tellus quis quam pretium congue. Etiam scelerisque cursus sagittis. Integer laoreet fringilla lectus vitae scelerisque. Vivamus mollis, orci eu congue dapibus, ante risus porta lectus, condimentum vehicula lectus mi a nibh. Curabitur lobortis massa in arcu dictum, efficitur lobortis dui sagittis. Quisque pellentesque ullamcorper nibh, eu bibendum quam tincidunt vel. Suspendisse potenti. Quisque dapibus aliquet est, vel eleifend nunc consectetur sit amet. Fusce luctus finibus justo eget ornare. Etiam venenatis odio nec scelerisque pulvinar. Pellentesque convallis eros sed odio viverra, vel ullamcorper magna eleifend. In vestibulum accumsan nisi eget ultrices."
}];

function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("removed campgrounds!");
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("added campground");
                        Comment.create({
                            text: "This place is great, but I wish there was intenet!",
                            author : "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                    }
                });

            });
        }
    });
}

module.exports = seedDB;