var todos = [];

while(input !== "quit"){
	var input = prompt("What you like to do?");

	if(input === "list"){
		listTodos();
	} else if ( input === "new"){
		addTodos();
	} else if(input === "delete"){
		deleteTodo();
	}
}
console.log("BYE BYE :)");

function listTodos(){
	console.log("*********");
		todos.forEach(function(todo, i){
			console.log(i + ": " +todo);
		});
		console.log("*********");
}
function addTodos(){
	var newTodo = prompt("enter new todo:");
		todos.push(newTodo);
		console.log("Added Todo");
}
function deleteTodo(){
	var index = prompt("Enter index of todo to delete");
		todos.splice(index,1);
		console.log("Deleted Todo");
}