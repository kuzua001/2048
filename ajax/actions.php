<?php
session_start();

require_once(dirname(__FILE__)."/../php/utils.php");

$db = new mysqli("localhost", "root", "1qazxsw2", "2048");
$db->query("set names utf8");



if (!isset($_POST["action"]))
	die ("action field is not presented;");
	
	
/* response in JSON */	
$response = array();	
	
	
switch ($_POST["action"]) {
	case "logon_status":
		$response["result"] = "ok";
		$response["data"] = isset($_SESSION["user"]);
	break;
	
	case "logout":
		unset($_SESSION["user"]);
		$response["result"] = "ok";
	break;
	
	case "new_game":
		if (isset($_SESSION["user"])) {
			$user_id = get_check_user_id();
			$db->query("insert into games(`user_id`) values('$user_id')");
			$id = $db->insert_id;
			$response["name"] = strip_tags($_SESSION["user"]["name"]);
		} else {
			$name = $db->real_escape_string(@$_POST["name"]);
			$db->query("insert into users(`name`) values('$name')");
			$user_id = $db->insert_id;
			$_SESSION["user"] = array(
				"id" => $user_id,
				"name" => $name
			);
			$db->query("insert into games(`user_id`) values('$user_id')");
			$id = $db->insert_id;
			$response["name"] = strip_tags($name);
		}
		
		$response["result"] = "ok";
		$response["id"] = $id;
		
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
		$res = $db->query(
			"select t3.id, t3.name, max(t1.score) as score
			from scores t1
			inner join games t2
				on t1.game_id = t2.id
			inner join users t3 
				on t2.user_id = t3.id
			where t1.loose = 1
			group by t3.id
			order by t1.score desc
			limit 10;"
		);
		
		while ($arr = $res->fetch_array(MYSQLI_ASSOC)) {
			strip_all($arr);
			$response["scores"][] = $arr;
		}
		$response["result"] = "ok";
	break;
	
	case "get_game_data":
		$user_id = get_check_user_id();
		$id = $db->real_escape_string(@$_POST["score_id"]);
		$res = $db->query(
			"select t1.data, t2.user_id 
			from scores t1 
			inner join games t2
				on t1.game_id = t2.id 
			where t1.id = $id
			limit 1"
		);
		// check if this game refers to current user
		if ($arr = $res->fetch_array(MYSQLI_ASSOC) && $arr["user_id"] == $user_id) {
			strip_all($arr);
			$response["data"] = $arr["data"];
			$response["result"] = "ok";
		} else {
			$response["result"] = "error";
		}
	break;
		
	case "get_game_savings":
		$user_id = get_check_user_id();
		$res = $db->query(
			"select t2.id, t1.name, t1.score, t1.data 
			from scores t1
			inner join games t2
				on t1.game_id = t2.id and t1.loose = 0
			inner join users t3
				on t2.user_id = t3.id and t3.id = $user_id
			order by t1.id desc"
		);
		$response["data"] = array();
		
		while ($arr = $res->fetch_array(MYSQLI_ASSOC)) {
			strip_all($arr);
			$response["data"][] = $arr;
		}
		$response["result"] = "ok";
	break;
	
	/* deprecated
	case "get_games_list":
		$user_id = get_check_user_id();
		$res = $db->query(
			"select t1.id
			from games t1
			inner join scores t2 
				on t1.id = t2.game_id and t2.loose = 0 
			where t1.user_id = $user_id
			group by t1.id
			having count(t2.id) > 0"
		);
		$response["data"] = array();
		
		$i = 1;
		while ($arr = $res->fetch_array(MYSQLI_ASSOC)) {
			$arr["name"] = "game #$i";
			strip_all($arr);
			$response["data"][] = $arr;
			$i ++;
		}
		$response["result"] = "ok";
	break;
	*/
}

echo json_encode($response);
