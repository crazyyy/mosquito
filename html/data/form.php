<?php

date_default_timezone_set('Europe/Moscow');
// User settings
$to = "crazyyy@gmail.com";
$subject = "Заказ с посадочной страницы (с формочки)";

if(@$_POST["hidden"])
  {
    $dt=date("d F Y, H:i:s"); // дата и время

    $fnm=$_POST["name"];
    $fnm=htmlspecialchars($fnm); // обрабатываем


    $email="info@net-komaroff.ru"; // e-mail откуда письмо

    $phone=$_POST["phone"];

    $mess.="<b>Имя:</b> $fnm<br>";
    $mess.="<b>Телефон:</b> $phone";

    $headers .= "X-Mailer: PHP/SimpleModalContactForm";
    $headers .= "MIME-Version: 1.0\n";
    $headers .= "Content-type: text/plain; charset=utf-8\n";
    $headers .= "Content-Transfer-Encoding: quoted-printable\n";
    mail($to, $subject, $mess, $headers); // отправляем
  }
?>
