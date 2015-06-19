<?php

/*
 * SimpleModal Contact Form
 * http://simplemodal.com
 *
 * Copyright (c) 2013 Eric Martin - http://ericmmartin.com
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */

date_default_timezone_set('Europe/Moscow');

// User settings
$to = "crazyyy@gmail.com";
$subject = "Заказ с посадочной страницы";

// Include extra form fields and/or submitter data?
// false = do not include
$extra = array(
	"form_subject"	=> true,
	"form_cc"		=> false,
	"ip"			=> true,
	"user_agent"	=> true
);

// Process
$action = isset($_POST["action"]) ? $_POST["action"] : "";
if (empty($action)) {
	// Send back the contact form HTML
	$output = "<div style='display:none'>
	<div class='contact-content'>
		<div class='contact-loading' style='display:none'></div>
		<div class='contact-message' style='display:none'></div>

		<form action='#' style='display:none'>
      <h3>Оставьте заявку</h3>
      <p>и мы вам обязательно перезвоним в ближайшее время</p>
      <input type='text' id='contact-name' class='contact-input' name='name' placeholder='Введите Ваше имя' tabindex='1001'>
			<input type='tel' id='contact-email' class='contact-input contact-phone' name='phone' placeholder='Введите номер телефона' tabindex='1002' />
      <button type='submit' class='contact-send contact-button' tabindex='1006'>Заказать звонок</button>
      <input type='hidden' name='token' value='" . smcf_token($to) . "'/><br/>
    </form>
  </div>
  </div>";

	echo $output;
}
else if ($action == "send") {
	// Send the email
	$name = isset($_POST["name"]) ? $_POST["name"] : "";
  $phone = isset($_POST["phone"]) ? $_POST["phone"] : "";
	$email = "info@net-komaroff.ru";
	$token = isset($_POST["token"]) ? $_POST["token"] : "";

	// make sure the token matches
	if ($token === smcf_token($to)) {
		smcf_send($name, $email);
		echo "Сообщение отправлено!.";
	}
	else {
		echo "Возможно, есть проблемы с отправкой.";
	}
}

function smcf_token($s) {
	return md5("smcf-" . $s . date("WY"));
}

// Validate and send email
function smcf_send($name, $email) {
	global $to, $extra;

	// Filter and validate fields
	$name = smcf_filter($name);
	$email = smcf_filter($email);
	$email = $to;

	// Add additional info to the message
	if ($extra["ip"]) {
		$message .= "\n\nIP: " . $_SERVER["REMOTE_ADDR"];
	}
	if ($extra["user_agent"]) {
		$message .= "\n\nUSER AGENT: " . $_SERVER["HTTP_USER_AGENT"];
	}

	// Set and wordwrap message body
	$body = "From: $name\n\n";

	// Build header
	$headers = "From: $email\n";
	$headers .= "X-Mailer: PHP/SimpleModalContactForm";

	// UTF-8
	if (function_exists('mb_encode_mimeheader')) {
		$subject = mb_encode_mimeheader($subject, "UTF-8", "B", "\n");
	}
	else {
		// you need to enable mb_encode_mimeheader or risk
		// getting emails that are not UTF-8 encoded
	}
	$headers .= "MIME-Version: 1.0\n";
	$headers .= "Content-type: text/plain; charset=utf-8\n";
	$headers .= "Content-Transfer-Encoding: quoted-printable\n";

	// Send email
	@mail($to, $subject, $body, $headers) or
		die("Unfortunately, a server issue prevented delivery of your message.");
}


exit;

?>
