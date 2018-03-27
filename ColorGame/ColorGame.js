var numOfSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButton = document.querySelectorAll(".mode");

init();

function init(){
	// mode buttons
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons(){
	for(var i = 0 ; i < modeButton.length; i++){
		modeButton[i].addEventListener("click",function(){
		modeButton[0].classList.remove("selected");
		modeButton[1].classList.remove("selected");
	    this.classList.add("selected");

	    this.textContent === "Easy" ? numOfSquares = 3: numOfSquares = 6;
	    reset();

		});
	}
}
function setupSquares(){
	for(var i = 0 ; i < squares.length; i++){
	// add click listeners to squares
		squares[i].addEventListener("click",function(){
		//grab color of clicked square and compare to pickedColor
		var clickedColor = this.style.backgroundColor;

		if(clickedColor === pickedColor){
			messageDisplay.textContent = "Correct!";
			resetButton.textContent = "Play Again?";
			h1.style.backgroundColor = clickedColor;
			changeColors(clickedColor);
		} else{
			this.style.backgroundColor = "#232323";
			messageDisplay.textContent = "Try Again";
		}		
		});
	}
}
function reset(){
	colors = generateRandomColors(numOfSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;

	messageDisplay.textContent = "";
	resetButton.textContent = "new colors";
	for(var i = 0 ; i < squares.length ; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];			
		} else {
			squares[i].style.display = "none";
		}
	}

	h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click",function(){
	reset();
});

function changeColors(color){
	//loop em todos os quadrados e mudar as cores
	for(var i = 0 ; i < squares.length ; i++){
		squares[i].style.backgroundColor = color;
	}
}
function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}
function generateRandomColors(num){
	var arr = [];

	for(var i = 0 ; i < num ; i++){
		arr.push(randomColor());
	}

	return arr;
}
function randomColor(){
	var r =Math.floor(Math.random() * 256);
	var g =Math.floor(Math.random() * 256);
	var b =Math.floor(Math.random() * 256);

	return "rgb(" + r + ", " + g +", " + b +")";
}