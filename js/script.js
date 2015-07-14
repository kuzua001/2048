function update_scores() {
	$.ajax({
		"url" : "./ajax/actions.php",
		"type" : "post",
		"data" : {action : "load_scores"},
		"success" : function(data) {
		console.log(data);
			scores = JSON.parse(data);
			if (scores && scores["scores"]) {
				scores = scores["scores"];
				$(".scores-list-element ul").empty();
				for (var i in scores) {
					$(".scores-list-element ul").append("<li>" + scores[i].name+", " + scores[i].score+"</li>")
				}
			}
		}
	});
}


$(function() {
	var gameObject = new game();
	
	
	//setting callback when we loose game
	
	gameObject.loose_func = function(obj) {
		obj.save_loose();
		$(".game-element").append($("<div class='loose-message-element'>You loose</div>"));
	}
	gameObject.render(".game-element");
	
	
	//renderes scores table
	update_scores();
	setInterval(function() {
		update_scores();
	}, 5000);

	$("body").on("keyup", function(e) {
		if (e.keyCode == 13) {
			$(".fade-element:visible button.default").click();
		}
	});

	$("body").on("click", ".fade-element .close", function(e) {
		gameObject.resume();
		$(e.currentTarget).parent().fadeOut();
		$(".overlay-element").fadeOut();
	});
	
	$(".menu-element .new").click(function() {
		gameObject.stop();
		$(".overlay-element").fadeIn();
		$(".fade-element.start-game").fadeIn();
		$(".fade-element.start-game input").focus();
	});
	
	$(".menu-element .save").click(function() {
		gameObject.stop();
		$(".overlay-element").fadeIn();
		$(".fade-element.save-game").fadeIn();
		$(".fade-element.save-game input").focus();
	});
	
	
	$(".fade-element.save-game button.save").click(function() {
		var $form = $(this).parent().parent();
		var name = $form.find("input[type='text']").val();
		gameObject.save(name, function() {
			gameObject.resume();
			$form.fadeOut();
			$(".overlay-element").fadeOut();
			$form.find("input[type='text']").val("");
		});
	});
	
	$(".fade-element.start-game button.new").click(function() {
		var $form = $(this).parent().parent();
		var name = $form.find("input[type='text']").val();
		$.ajax({
			"url" : "./ajax/actions.php",
			"type" : "post",
			"data" : {"name" : name, "action": "new_game"},
			"success" : function(data) {
				var dataArr = JSON.parse(data);
				gameObject.start(dataArr.id);
				$(".score-element .score").html(0);
				$(".score-element .name").html(dataArr.name ? dataArr.name : "Noname");
				gameObject.render(".game-element");
				$form.fadeOut();
				$(".overlay-element").fadeOut();
				$form.find("input[type='text']").val("");
			}
		});
	});
		
	$(".menu-element .new").click();
	
	$("body").on("keyup", ".overlay-element", function(e) {
		alert(1);
		e.preventDefault();
		return false;
	});
	
	$("body").on("keyup", function(e) {
		switch (e.keyCode) {
			case 38: gameObject.process(0, 1); break;
			case 40: gameObject.process(0, -1); break;
			case 37: gameObject.process(1, 0); break;
			case 39: gameObject.process(-1, 0); break;
		}
		
		$(".score-element .score").html(gameObject.score);
		gameObject.render(".game-element");
    });
});
