function update_scores() {
	$.ajax({
		"url" : "./ajax/actions.php",
		"type" : "post",
		"data" : {action : "load_scores"},
		"success" : function(data) {
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

var tableSavings;

$(function() {
	var gameObject = new game();
	
	
	//setting callback when we loose game
	
	gameObject.loose_func = function(obj) {
		
		gameObject.render(".game-element", true); /*very important point, we don`t incapsulate the selector of game DOM element into the game object
		to keep some mvc logic, but after the end of the game we have to FORCE render game field one more time, so we do it in this callback */
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
		$.ajax({
			"url" : "./ajax/actions.php",
			"type" : "post",
			"data" : {"action": "logon_status"},
			"success" : function(data) {
				var dataArr = JSON.parse(data);
				if (dataArr) {
					var logged_in = dataArr["data"];
					if (logged_in) {
						$.ajax({
							"url" : "./ajax/actions.php",
							"type" : "post",
							"data" : {"action": "new_game"},
							"success" : function(data) {
								var dataArr = JSON.parse(data);
								gameObject.start(dataArr.id);
								$(".score-element .score").html(0);
								$(".score-element .name").html(dataArr.name ? dataArr.name : "Noname");
								gameObject.render(".game-element");
							}
						});
						if (!$(".menu-element button.logout").length) {
							$(".menu-element").append("<button class='logout'>logout</button>");
						}
					} else {
						$(".menu-element button.logout").remove();
						$(".overlay-element").fadeIn();
						$(".fade-element.start-game").fadeIn();
						$(".fade-element.start-game input").focus();
					}
				}
			}
		});
	});
	
	// logout listener
	
	$(".menu-element").on("click", "button.logout", function() {
		$.ajax({
			"url" : "./ajax/actions.php",
			"type" : "post",
			"data" : {"action": "logout"},
			"success" : function(data) {
				var dataArr = JSON.parse(data);
				if (dataArr && dataArr.result == "ok") {
					$(".score-element .score").html(0);
					$(".score-element .name").html("Noname");
				}
				$(".menu-element .new").click();
			}
		});
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
				
				if (!$(".menu-element button.logout").length) {
					$(".menu-element").append("<button class='logout'>logout</button>");
				}
				
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
	
	var rowTemplate = "<tr data-id='{id}' data-saving-id={saving_id} data-score='{score}' data-saving-name='{name}' data-data='{data}'><td>{name}</td><td>{score}</td><td><span class='load'>load</span>/<span class='delete'>delete</span></td></tr>";
	
	$(".menu-element .load").click(function() {
		gameObject.stop();
		
		tableSavings = $(".fade-element.load-game table.games").DataTable();
		tableSavings.destroy();
		$(".fade-element.load-game table.games tbody").empty();
		
		$.ajax({
			"url" : "./ajax/actions.php",
			"type" : "post",
			"data" : {"action" : "get_game_savings"},
			"success" : function(data) {
				var dataArr = JSON.parse(data);
				if (dataArr && dataArr["data"].length) {
					for (var i in dataArr["data"]) {
						$(".fade-element.load-game table.games tbody").append(
							$(rowTemplate.apply_template({
								data  : dataArr["data"][i].data,
								name  : dataArr["data"][i].name,
								score : dataArr["data"][i].score,
								id    : dataArr["data"][i].id,
								saving_id: dataArr["data"][i].saving_id
							}))
						);
					}
					
					
					tableSavings = $(".fade-element.load-game table.games").DataTable({
						"paging":   true,
						"ordering": false,
						"info":     false,
						"searching" : false,
						"lengthChange" : false
					});
					$(".overlay-element").fadeIn();
					$(".fade-element.load-game").fadeIn();
				}
			}
		});
	});
	
	
	// game savings table actions:
	
	$(".fade-element.load-game").on("click", "span.delete", function(e) {
		var $row = $(e.currentTarget).parent().parent();
		var saving_id = $row.data("saving-id");
		var saving_name = $row.data("saving-name");
		if (confirm("Delete saving '" + saving_name + "'?")) {
			$.ajax({
				"url" : "./ajax/actions.php",
				"type" : "post",
				"data" : {"action" : "del_game_data", "score_id" : saving_id},
				"success" : function(data) {
					tableSavings.row($row).remove().draw();
				}
			});
		}
	});
	
	$(".fade-element.load-game").on("click", "span.load", function(e) {
		var $row = $(e.currentTarget).parent().parent();
		var game_id = $row.data("id");
		var saving_name = $row.data("savig-name");
		var score = $row.data("score");
		var data = $row.data("data");
		
		if (game_id && data) {
			gameObject.id = game_id;
			gameObject.rows = data;
			gameObject.score = score;
		
			gameObject.resume();
			gameObject.render(".game-element");
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
