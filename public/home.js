$(document).ready(function(){

	listTodo();
	/* $('#newtodo').submit(function(e){
		e.preventDefault();
		console.log('submit');
		$.post("/todo",{'text': $('#text').val()}, function(data){
			console.log(data);
			
			listTodo();
					
		});	
		$('#newtodo')[0].reset();
	}); */

	$('#todo-link').click(function(){
		listTodo();
	});

	$('#done-link').click(function(){
		listDone();
	});
});

function submitTodo(item){
	console.log('submit');
	$.post("/todo",{'text': item}, function(data){
		console.log(data);

		listTodo();

	});	
	$('#newtodo')[0].reset();	
}

function listTodo(){
	$.get('/todo', function(items){

		$('#items').empty();
		$.each(items, function(index, item){
			$('#items').append('<li class="item"><i class="todo-item-check fa fa-square-o" aria-hidden="true"></i><span data-id="'+ index +'"> '+ item +'</span></li>');
		});
		addEventListeners();

	});
}

function listDone(){
	$.get('/done', function(items){

		$('#items').empty();
		$.each(items, function(index, item){
			$('#items').append('<li class="item"><i class="done-item-check fa fa-check-square-o" aria-hidden="true"></i><span data-id="'+ index +'"> '+ item +'</span></li>');
		});
		addEventListeners();
	
	});
	
	
}

function addEventListeners(){
	$('.done-item-check').click(function(){
		$(this).fadeOut();
		item = $(this).next('span');
		itemid = $(this).next('span').data('id');
		$.post('/undo', {'id' :  itemid}, function(data){
			console.log(data);
			listDone();

		});
	});
	
	$('.todo-item-check').click(function(){
		$(this).fadeOut();
		item = $(this).next('span');
		itemid = $(this).next('span').data('id');
		$.post('/done', {'id' :  itemid}, function(data){
			console.log(data);
			listTodo();

		});
	});
}
