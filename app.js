var express  			  = require("express"),
	app      			  = express(),
	mongoose 			  = require("mongoose"),
	bodyParser 			  = require("body-parser"),
	passport 			  = require("passport"),
	LocalStrategy 		  = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose");
	User				  = require("./models/user")

mongoose.connect("mongodb://localhost/auth_demo_app");

app.use(require("express-session")({
	secret : "Testing is nice",
	resave: false,
	saveUninitialized: false

}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ===================
// ROUTES
// ===================

app.get("/",function(req,res){
	res.render("home");
});

app.get("/secret",function(req,res){
	res.render("secret");
});

// Auth Routes
app.get("/register", function(req ,res){
	res.render("register");
});

//Handling register
app.post("/register" , function(req,res){
	User.register(new User({username : req.body.username}), req.body.password, function(err,user){
		if(err){
			console.log(err);
			return res.render("register");
		} else {
			passport.authenticate("local")(req, res ,function(){
				res.redirect("/secret");
			});
		}
	});
});

//Login routes

app.get("/login",function(req,res){
	res.render("login");
});

app.post("/login",passport.authenticate("local",{
	sucessRedirect : "/secret",
	failereRedirect : "/login"
}), function(req,res){
});

app.get("/logout",function(req,res){
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

app.listen(3000,function(){
	console.log("server started...");
});