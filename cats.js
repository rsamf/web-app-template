var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");
/////


var Cat = mongoose.model("Cat", new mongoose.Schema({
    name:String,
    age : Number,
    temperament : String
}));

/////
// var george = new Cat({
//     name : "George",
//     age : 11,
//     temperament : "grouchy"
// });

// george.save(function(err, item){
//     if(err){
//         console.log("Something went wrong with mongoose.model().save().\n" + err);
//     } else {
//         console.log("Item saved:\n" + item);
//     }
// });

Cat.create({
    name : "Snow White",
    age : 15,
    temperament : "bland"
}, function(err, item){
    if(err) {
       console.log("mongoose.model().create() err.\n" + err); 
    } else {
        console.log("Item:\n" + item)
    }
});

Cat.find({}, function(err, items){
   if(err){
       console.log("mongoose.model().find() error.\n" + err);
   } else {
       console.log("Items:\n" + items);
   }
});