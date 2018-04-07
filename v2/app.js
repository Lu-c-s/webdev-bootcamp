var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/yelp_camp");
//SCHEMA
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground",campgroundSchema);

// Campground.create(
// 	{
// 		name: "Sheep Creek",
// 		image : "https://cdn.pixabay.com/photo/2018/03/22/09/39/grass-3249879__340.jpg",
// 		description :"This a huge granite hill. No bathroom. No comfort because no!"
// 	},
// 	function(err,campground){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			console.log("new campground created");
// 			console.log(campground);
// 		}
// 	}
// )

app.get("/",function(req,res){
	res.render("landing");
});

// INDEX ROUTE - show all campgrounds
app.get("/campgrounds",function(req,res){
	//get all campgrounds from DB
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("index",{campgrounds:allCampgrounds });
		}
	});
});

// CREATE ROUTE - add new campgroudn to DB
app.post("/campgrounds",function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {
		name: name,
		image: image,
		description: desc
	};
	// create campground and save to database
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
});

// NEW ROUTE - show form to create to new campground
app.get("/campgrounds/new",function(req,res){
	res.render("new");
});

// SHOW ROUTE - shows info about one campground
app.get("/campgrounds/:id",function(req,res){
	//find campground with the id
	Campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			console.log(err);
		} else {
			res.render("show",{camp : foundCampground});
		}
	});
	//show info about the campground with the id
	

});

app.listen(3000,function(){
	console.log("Server is working...");
})