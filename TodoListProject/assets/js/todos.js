//Marca os todos ja feitos
$("ul").on("click","li",function(){
	$(this).toggleClass("completed");
});

//Clicar no X para deletar o to-do
$("ul").on("click","span",function(event){
	$(this).parent().fadeOut(500,function(){
		$(this).remove();
	});
	event.stopPropagation();

});

// Inserir o to-do
$("input[type='text']").keypress(function(event){
	if(event.which === 13){
		//Extrair valo do input text
		var todoText = $(this).val();
		//Limpar input
		$(this).val("");
		//Criar nova li e adiocionar na ul
		$("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>")
	}
});

// toggle input
$("#toggle-form").click(function(){
	$("input[type='text']").fadeToggle();
})
