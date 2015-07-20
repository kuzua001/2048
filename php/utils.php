<?php

function strip_all(&$arr) {
	foreach ($arr as $key => $val) {
		$arr[$key] = strip_tags($val);
	}
}
