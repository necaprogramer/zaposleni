<?php
$imePrezime = htmlspecialchars($_POST['ime-prezime']);
$vremeOd = htmlspecialchars($_POST['vreme-od']);
$vremeDo = htmlspecialchars($_POST['vreme-do']);

echo $imePrezime . ", uspesno ste podneli zahtev administratoru za odmor u periodu od " . $vremeOd . " do " . $vremeDo;
?>