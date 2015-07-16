<?php
//header("Access-Control-Allow-Origin: *");

$db = new mysqli("localhost", "root", "1qazxsw2", "2048");
$db->query("set names utf8");


if (!isset($_POST["action"]))
	die ("action field is not presented;");
	
	
/* response in JSON */	
$response = array();	
	
	
switch ($_POST["action"]) {
	case "new_game":
		$name = $db->real_escape_string(@$_POST["name"]);
		$db->query("insert into games(`name`) values('$name')");
		$id = $db->insert_id;
		$response["result"] = "ok";
		$response["id"] = $id;
		$response["name"] = strip_tags($name);
	break;
	
	case "save_game":
		$name = $db->real_escape_string(@$_POST["name"]);
		$data = $db->real_escape_string(@$_POST["data"]);
		$score = $db->real_escape_string(@$_POST["score"]);
		$game_id = $db->real_escape_string(@$_POST["game_id"]);
		$loose = isset($_POST["loose"]) ? 1 : 0;
		$db->query("insert into scores(`name`, `data`, `score`, `game_id`, `loose`) 
		values('$name', '$data', $score, $game_id, $loose)");
		$id = $db->insert_id;
		$response["result"] = "ok";
		$response["id"] = $id;
		$response["name"] = strip_tags($name);
		$response["score"] = strip_tags($score);
	break;
	
	case "load_scores":
		$res = $db->query("select t1.id, t2.name, t1.score from scores t1 inner join games t2 on t1.game_id = t2.id where t1.loose = 1 order by t1.score desc limit 10");
		while ($arr = $res->fetch_array(MYSQLI_ASSOC)) {
			$response["scores"][] = $arr;
		}
		$response["result"] = "ok";
	break;
	
	case "get_game_data":
		$id = $db->real_escape_string(@$_POST["score_id"]);
		$res = $db->query("select data from scores where id = $id limit 1");
		if ($arr = $res->fetch_array(MYSQLI_ASSOC)) {
			$response["data"] = $arr["data"];
			$response["result"] = "ok";
		} else {
			$response["result"] = "error";
		}
	break;
	
	case "get_games_list":
		$res = $db->query("select t1.id, t1.name from games t1 inner join scores t2 on t1.id = t2.game_id and t2.loose = 0 group by t1.id having count(t2.id) > 0");
		$response["data"] = array();
		
		while ($arr = $res->fetch_array(MYSQLI_ASSOC)) {
			$response["data"][] = $arr;
		}
		$response["result"] = "ok";
	break;
	
	case "get_game_savings":
		$id = $db->real_escape_string(@$_POST["game_id"]);
		$res = $db->query("select id, name, score, data from scores where game_id = $id and loose = 0");
		$response["data"] = array();
		
		while ($arr = $res->fetch_array(MYSQLI_ASSOC)) {
			$response["data"][] = $arr;
		}
		$response["result"] = "ok";
	break;
}

echo json_encode($response);
