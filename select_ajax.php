<?php

$remixlang = isset($_REQUEST['remixlang']) ? $_REQUEST['remixlang'] : '';
$country = isset($_REQUEST['country']) ? $_REQUEST['country'] : '';
$str = isset($_REQUEST['str']) ? $_REQUEST['str'] : '';

$remixlang = intval($remixlang) < 0 ? 0 : intval($remixlang);

$opts = array(
  'http'=>array(
    'method'=>"GET",
    'header'=>"Cookie: remixlang=".$remixlang."\r\n"
  )
);

$context = stream_context_create($opts);


if($_REQUEST['act'] == 'a_get_country_info') {
	header("Content-Type: text/html; charset=cp1251");
	echo file_get_contents("https://vk.com/select_ajax.php?act=a_get_country_info&fields=1&country=".intval($country),false, $context);
}

if($_REQUEST['act'] == 'a_get_cities') {
	header("Content-Type: text/html; charset=utf-8");
	echo file_get_contents("https://vk.com/select_ajax.php?act=a_get_cities&country=".intval($country)."&str=".urlencode($str), false, $context);
}

if($_REQUEST['act'] == 'a_get_universities') {
	header("Content-Type: text/html; charset=cp1251");
	echo file_get_contents("https://vk.com/select_ajax.php?act=a_get_universities&country=".intval($country)."&str=".urlencode($str), false, $context);
}
?>