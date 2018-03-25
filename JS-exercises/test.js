var age = prompt("How old are you?");

if(age < 0){
	console.log("invalid age");
}
if (age === 21) {
	console.log("happy 21st birthday");
}
if (if (age %2 !== 0)) {
	console.log("your age is odd!");
}
if (age % Math.sqrt(age) === 0) {
	console.log("Your age is a perfect square!");
}
// wHILE PROBLEM SET
var count = -10;

while(count <= 19){
	console.log(count);
	count++;
}
//FOR

for(var i = -10; i <= 19 ; i++){
	console.log(i);
}


count = 10;
while(count <= 40){
	if (count % 2 === 0) {
		console.log(count);
	}
	count++	
}
//for
for(var i = 10 ; i <= 40; i+=2){
	count(i);
}

count = 300;
while(count <= 333){
	if(count % 2 !== 0){
		console.log(count);
	}
	count++;
}
//FOR
for(var i = 300 ; i <= 333 ; i++){
	if(i % 2 === 0){
		console.log(i);
	}
}

count = 5;
while(count <= 50){
	if((count % 5 == 0) && (count % 3 == 0)){
		console.log(count);
	}
	count++;
}
//FOR
for(var i = 5 ; i <= 50 ; i++){
	if(i% 5 == 0 && i % 3 == 0){
		console.log(i);
	}
}

// Annoy
var answer = prompt("are we there yet");

while(answer.indexOf("yes") === -1 || answer.indexOf("yeah") === -1 ){
	var answer = prompt("are we there yet"); 
}
alert("YAY , we made it");