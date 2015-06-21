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
$subject = "Заказ с посадочной страницы (перезвонить)";

// Include extra form fields and/or submitter data?
// false = do not include
$extra = array(
  "ip"      => true,
  "user_agent"  => true
);

// Process
$action = isset($_POST["action"]) ? $_POST["action"] : "";

if ($action == "send") {
  // Send the email
  $name = isset($_POST["name"]) ? $_POST["name"] : "";
  $email = isset($_POST["email"]) ? $_POST["email"] : "";
  $subject = isset($_POST["subject"]) ? $_POST["subject"] : $subject;
  $message = isset($_POST["message"]) ? $_POST["message"] : "";
  $cc = isset($_POST["cc"]) ? $_POST["cc"] : "";
  $token = isset($_POST["token"]) ? $_POST["token"] : "";

  // make sure the token matches
  if ($token === smcf_token($to)) {
    smcf_send($name, $email, $subject, $message, $cc);
    echo "<div class='thanx'>
  <h4>Благодарим вас за заявку</h4>
  <p>Менеджер свяжется с вами в ближайшее время. <br>
  А пока можете:</p>
  <ul>
    <li>посмотреть короткое видео <a href='#' class='yt'>«Уничтожитель комаров SketteerVac»</a></li>
    <li>ознакомиться с <a href='#' class='pdf'>инструкцией по применению</a></li>
  </ul>
  </div>
  <!-- /.thanx -->";
  }
  else {
    echo "Unfortunately, your message could not be verified.";
  }
}

function smcf_token($s) {
  return md5("smcf-" . $s . date("WY"));
}

// Validate and send email
function smcf_send($name, $email, $subject, $message, $cc) {
  global $to, $extra;

  // Filter and validate fields
  $name = smcf_filter($name);
  $subject = smcf_filter($subject);
  $email = smcf_filter($email);
  if (!smcf_validate_email($email)) {
    $subject .= " - invalid email";
    $message .= "\n\nBad email: $email";
    $email = $to;
    $cc = 0; // do not CC "sender"
  }

  // Add additional info to the message
  if ($extra["ip"]) {
    $message .= "\n\nIP: " . $_SERVER["REMOTE_ADDR"];
  }
  if ($extra["user_agent"]) {
    $message .= "\n\nUSER AGENT: " . $_SERVER["HTTP_USER_AGENT"];
  }

  // Set and wordwrap message body
  $body = "From: $name\n\n";
  $body .= "Message: $message";
  $body = wordwrap($body, 70);

  // Build header
  $headers = "From: $email\n";
  if ($cc == 1) {
    $headers .= "Cc: $email\n";
  }
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

// Remove any un-safe values to prevent email injection
function smcf_filter($value) {
  $pattern = array("/\n/","/\r/","/content-type:/i","/to:/i", "/from:/i", "/cc:/i");
  $value = preg_replace($pattern, "", $value);
  return $value;
}

// Validate email address format in case client-side validation "fails"
function smcf_validate_email($email) {
  $at = strrpos($email, "@");

  // Make sure the at (@) sybmol exists and
  // it is not the first or last character
  if ($at && ($at < 1 || ($at + 1) == strlen($email)))
    return false;

  // Make sure there aren't multiple periods together
  if (preg_match("/(\.{2,})/", $email))
    return false;

  // Break up the local and domain portions
  $local = substr($email, 0, $at);
  $domain = substr($email, $at + 1);


  // Check lengths
  $locLen = strlen($local);
  $domLen = strlen($domain);
  if ($locLen < 1 || $locLen > 64 || $domLen < 4 || $domLen > 255)
    return false;

  // Make sure local and domain don't start with or end with a period
  if (preg_match("/(^\.|\.$)/", $local) || preg_match("/(^\.|\.$)/", $domain))
    return false;

  // Check for quoted-string addresses
  // Since almost anything is allowed in a quoted-string address,
  // we're just going to let them go through
  if (!preg_match('/^"(.+)"$/', $local)) {
    // It's a dot-string address...check for valid characters
    if (!preg_match('/^[-a-zA-Z0-9!#$%*\/?|^{}`~&\'+=_\.]*$/', $local))
      return false;
  }

  // Make sure domain contains only valid characters and at least one period
  if (!preg_match("/^[-a-zA-Z0-9\.]*$/", $domain) || !strpos($domain, "."))
    return false;

  return true;
}

exit;

?>
