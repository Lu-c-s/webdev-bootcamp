var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var campgrounds = [
		{name: "Salmon Creeak", image: "https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b0144397f4c371afe9b1_340.jpg"},
		{name: "Salmon sheep", image: "https://pixabay.com/get/ea37b70d21f0003ed1584d05fb1d4e97e07ee3d21cac104497f2c57bafe5b1bc_340.jpg"},
		{name: "Salmon Hill", image: "https://pixabay.com/get/eb35b70b2df6033ed1584d05fb1d4e97e07ee3d21cac104497f2c57bafe5b1bc_340.jpg"}
	];

app.get("/",function(req,res){
	res.render("landing");
});

app.get("/campgrounds",function(req,res){
	
	res.render("campgrounds",{ campgrounds:campgrounds });
});

app.post("/campgrounds",function(req,res){
	// pegar dados do form e adicoionar o array campgrounds
	// e redirecionar para pagina campgrounds
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {
		name: name,
		image: image
	};

	campgrounds.push(newCampground);
	res.redirect("/campgrounds");

});
app.get("/campgrounds/new",function(req,res){
	res.render("new");
});

app.listen(3000,function(){
	console.log("Server is working...");
})