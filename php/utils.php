<?php

function strip_all(&$arr) {
	foreach ($arr as $key => $val) {
		$arr[$key] = strip_tags($val);
	}
}

function get_check_user_id() {
	global $db;
	if (!isset($_SESSION["user"]) || $_SESSION["user"]["id"] == 0) {
		die("Authorization error");
	}
	return $db->real_escape_string($_SESSION["user"]["id"]);
}
