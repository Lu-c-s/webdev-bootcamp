var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose");
	Campground = require("./models/campgrounds");
	seedDB = require("./seeds");

seedDB();	
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/yelp_camp");

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
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
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