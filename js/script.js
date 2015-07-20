function update_scores() {
	$.ajax({
		"url" : "./ajax/actions.php",
		"type" : "post",
		"data" : {action : "load_scores"},
		"success" : function(data) {
			//console.log(data);
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
	
	$(".menu-element .load").click(function() {
		gameObject.stop();
		$(".overlay-element").fadeIn();
		$(".fade-element.load-game").fadeIn();
		$(".fade-element.load-game select.game").empty();
		$(".fade-element.load-game select.saving").empty();
		$(".fade-element.load-game select.saving").append(
			$("<option value='0'>choose saving</option>")
		);
		
		$.ajax({
			"url" : "./ajax/actions.php",
			"type" : "post",
			"data" : {"action" : "get_games_list"},
			"success" : function(data) {
				var dataArr = JSON.parse(data);
				if (dataArr) {
					$(".fade-element.load-game select.game").append(
						$("<option value='0'>choose game</option>")
					);
					for (var i in dataArr["data"]) {
						$(".fade-element.load-game select.game").append(
							$("<option value='" + dataArr["data"][i].id + "'>" + dataArr["data"][i].name + "</option>")
						);
					}
				}
			}
		});
	});
	
	
	$(".fade-element.load-game select.game").on("change", function(e) {
		var $select = $(e.currentTarget);
		var game_id = $select.val();
		if (game_id != 0) {
			$.ajax({
				"url" : "./ajax/actions.php",
				"type" : "post",
				"data" : {"action" : "get_game_savings", "game_id" : game_id},
				"success" : function(data) {
					var dataArr = JSON.parse(data);
					$(".fade-element.load-game select.saving").empty();
					if (dataArr) {
						$(".fade-element.load-game select.saving").append(
							$("<option value='0'>choose saving</option>")
						);
						for (var i in dataArr["data"]) {
							$(".fade-element.load-game select.saving").append(
								$("<option data-score='" + dataArr["data"][i].score + "' data-data='" + dataArr["data"][i].data + "' value='" + dataArr["data"][i].id + "'>" + dataArr["data"][i].name + "</option>")
							);
						}
					}
				}	
			});
		}
	});
	
	$(".fade-element.load-game button.load").on("click", function() {
		var game_id = $(".fade-element.load-game select.game").val();
		var game_name = $(".fade-element.load-game select.game option:selected").text();
		var $saving = $(".fade-element.load-game select.saving option:selected");
		var score = $saving.data("score");
		
		if (game_id && $saving.data("data")) {
			gameObject.id = game_id;
			gameObject.rows = $saving.data("data");
			gameObject.score = score;
			
			//console.log(data);
			gameObject.resume();
			gameObject.render(".game-element");
			$(".score-element .name").html(game_name);
			$(".score-element .score").html(score);
			
			
			$(".fade-element.load-game").fadeOut();
			$(".overlay-element").fadeOut();
		} else {
			alert("No saving selected");
		}
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
