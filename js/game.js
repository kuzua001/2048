var tileTemplate = "<span class='tile-element' data-x='{x}' data-y='{y}' data-val='{val}'></span>";

String.prototype.apply_template = function (data) {
    var result = this;
	for (var key in data) {
		result = result.replace("{" + key + "}", data[key]);
	}
	
	return result;
};



var game = function() {
	this.rows = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];
	
	this.stopGame = true;
	this.id = 0;
	
	this.stop = function() {
		this.stopGame = true;
	}
	
	this.resume = function() {
		this.stopGame = false;
	}
	

	this.score = 0;
	
	this.set = function(i, j, val) {
		if (i >= 0 && i < 4 &&
		j >= 0 && j < 4)
		this.rows[i][j] = val;
	}
	
	this.save = function(name, callback) {
		$.ajax({
			"url" : "./ajax/actions.php",
			"type" : "post",
			"data" : {"name" : name, "action": "save_game", "data" : JSON.stringify(this.rows), "score" : this.score, "game_id" : this.id},
			"success" : function(data) {
				if (callback !== undefined) {
					callback();
				}
			}
		});
	}
	
	this.save_loose = function() {
		$.ajax({
			"url" : "./ajax/actions.php",
			"type" : "post",
			"data" : {"loose" : true, "action": "save_game", "data" : JSON.stringify(this.rows), "score" : this.score, "game_id" : this.id}
		});
	}
	
	this.start = function(id) {
		this.id = id;
		this.score = 0;
		this.rows = [
	 		[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		];
		this.add_random();
	
		this.add_random();
	
		this.resume();

	}
	
	this.setXY = function (coord, val) {
		this.set(coord.x, coord.y, val);
	}
	
	this.get = function(i, j) {
		if (i >= 0 && i < 4 &&
		j >= 0 && j < 4)
		
			return this.rows[i][j];
		else
		
			return null;
	}
	
	this.render = function(sel) {
		if (this.stopGame) return;
		var $gameElement = $(sel);
		
		console.log($gameElement);
		
		$gameElement.empty();
		for (var i in this.rows) {
			for (var j in this.rows[i]) {
				var val = this.rows[i][j];
				
				if (val) {
					$gameElement.append(tileTemplate.apply_template({
						"x" : i,
						"y" : j,
						"val" : val
					}));
				}
			}
		}
	}
	
	// i use magic numbers.. because this game has only one fixed number of cells and rows - 4 and i suppose that all indexes(both x and y) are between 0 and 3
	var n = 4;
	
	//mega function.. 
	// x_dir = 0 y_dir =  1 - move up
	// x_dir = 0 y_dir = -1 - move down
	// x_dir =  1 y_dir = 0 - move right
	// x_dir = -1 y_dir = 0 - move left
	// and we use easy sample alghoritm in one direction, then we change our coordinates according to a direction of moveent specified with x_dir and y_dir;
	
	
this.add_random = function() {
		
		var count = 0;
		for (var i = 0; i < n; i ++) {
			for (var j = 0; j < n; j ++) {
				if (this.get(i, j) == 0) count ++;
			}
		}
		
		if (count)
		while (true)
		for (var i = 0; i < n; i ++) {
			for (var j = 0; j < n; j ++) {
				if (this.get(i, j) == 0 && Math.random() < 1 / count) {
					this.set(i, j, Math.random() < 0.9 ? 1 : 2);
					console.log("rendered");
					
					return;
				
}
			}
		}
	
	}
	
	this.loose_func = null;
	
	
	this.process = function(x_dir, y_dir) {
		
		if (this.stopGame) {
			console.log("The Game is currently stopped. No actions could be processed.");
			
			return;
		}
		console.log("process called");
		
		var tilesMoved = false;
		for (var i = 0; i < n; i ++) {
			tilesMoved |= this.move (i, x_dir, y_dir);
		}
		

		var count = 0;
		for (var i = 0; i < n; i ++) {
			for (var j = 0; j < n; j ++) {
				if (this.get(i, j) == 0) count ++;
			}
		}
		
		if (!count) {
			this.stop();
			return this.loose_func !== null ? this.loose_func(this) : false;
		}
		
		if (count && tilesMoved)
		this.add_random();
	}
	
	this.getXY = function (x, y, x_dir, y_dir) {
		var x_ret, y_ret;
		if (x_dir == 0) {
			if (y_dir == 1) {
				x_ret = x; y_ret = y;
			} else if (y_dir == -1) {
				x_ret = x; y_ret = n - 1 - y; 
			} else {
				return false;
			}
		} else if (y_dir == 0) {
			if (x_dir == 1) {
				x_ret = x; y_ret = y;
				t = x_ret; x_ret = y_ret; y_ret = t;
			} else if (x_dir == -1) {
				x_ret = x; y_ret = n - 1 - y;
				t = x_ret; x_ret = y_ret; y_ret = t;
			} else {
				return false;
			}
		}
		
		return {x: x_ret, y: y_ret};
	}
	
	
	this.move = function (i, x_dir, y_dir) {
		var moved = false;
		var pos = 0;
		var pos1 = 0; var pos2 = 0;
		var val1 = 0; var val2 = 0;
		var found_first = false;
		var found_second = false;
		
		for (var j = 0; j < n; j ++) {
			var current = this.getXY(i, j, x_dir, y_dir);
			if (found_first == false && this.get(current.x, current.y) != 0) {
				pos1 = j; val1 = this.get(current.x, current.y); found_first = true;
			} 
			else if (found_first == true && found_second == false && this.get(current.x, current.y) != 0) {
				pos2 = j; val2 = this.get(current.x, current.y); found_second = true;
				this.setXY(this.getXY(i, pos1, x_dir, y_dir), 0);
				this.setXY(this.getXY(i, pos2, x_dir, y_dir), 0);
				
				if (val1 == val2) {
					this.setXY(this.getXY(i, pos, x_dir, y_dir), val1 + 1);
					pos += 1;
					found_first = false;
					found_second = false;
					this.score += Math.pow(2, val1 + 1);
					moved |= true;
					//console.log(i + ' moved in first if');
				} else {
					this.setXY(this.getXY(i, pos, x_dir, y_dir), val1);
					this.setXY(this.getXY(i, pos + 1, x_dir, y_dir), val2);
					
					
					pos += 1;
					found_second = false;
					val1 = val2;
					pos1 = pos2;
				}
			}
		}
		
		if (found_first && found_second == false) {
			this.setXY(this.getXY(i, pos1, x_dir, y_dir), 0);	
			this.setXY(this.getXY(i, pos, x_dir, y_dir), val1);
			
			if (pos1 != 0 && pos != pos1) {
				moved |= true;
				//console.log(i + ' moved in last if');
			}
		}
		
		return moved;	
	}	
};
