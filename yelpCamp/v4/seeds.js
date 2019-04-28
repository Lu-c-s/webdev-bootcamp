var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");

var data = [
	{name: "Cloud's rest",
	 image : "https://images.unsplash.com/photo-1495685288924-ce05d1036b24?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9c18e42f88d973bbdf030b7ec3544e39&auto=format&fit=crop&w=1050&q=80",
	 description: "Beatiful place. nature . no TV. have fun"
	},
	{name: "Woods place",
	 image : "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ffdbb5e90a2c129258d4540ef0f29d06&auto=format&fit=crop&w=500&q=60",
	 description: "Beatiful place. nature . no TV. have fun"
	},
	{name: "Icy place",
	 image : "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d1c8cc988efddbda8746281871c0c8bf&auto=format&fit=crop&w=500&q=60",
	 description: "Beatiful place. nature . no TV. have fun"
	},
]
function seedDB(){
	// remove todos os campgrounds
	Campground.remove({},function (err){
		if(err){
			console.log(err);
		} else {
			console.log("removed campgrounds!");
			data.forEach(function(seed){
				Campground.create(seed,function(err, campground){
				if(err){
					console.log(err);
				} else {
					console.log("added a campground");
					Comment.create(
					{
						text:"This place is great. but i wish there as internet",
						author:"homer"
					},function(err,comment){
						if(err){
							console.log(err);
						} else {
							campground.comments.push(comment);
							campground.save();
							console.log("created new comment");
						}
					}
				   );
				}
			});
		});
		}	
	});
	// adicionar alguns campgrounds


}
module.exports = seedDB;