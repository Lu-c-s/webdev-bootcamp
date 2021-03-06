var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose");
	Campground = require("./models/campgrounds");
	Comment = require("./models/comment");
	seedDB = require("./seeds");

seedDB();	
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

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
			res.render("campgrounds/index",{campgrounds:allCampgrounds });
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
	res.render("campgrounds/new");
});

// SHOW ROUTE - shows info about one campground
app.get("/campgrounds/:id",function(req,res){
	//find campground with the id
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/show",{camp : foundCampground});
		}
	});
});	
// ==================
// COMMENT ROUTES
// ==================

app.get("/campgrounds/:id/comments/new",function(req,res){
	Campground.findById(req.params.id, function(err,campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	})
});

app.post("/campgrounds/:id/comments",function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function(err,comment){
				if(err){
					console.log(err);
				} else {
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

app.listen(3000,function(){
	console.log("Server is working...");
})
