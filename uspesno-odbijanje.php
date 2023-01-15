<?php
$imePrezime = htmlspecialchars($_POST['da-dugme']);
$filename = 'zaposleni.json';
if (file_exists($filename)) {
    $data = file_get_contents($filename);
    $zaposleni = json_decode($data);

    foreach ($zaposleni as $tim => $radnici) {
        foreach ($radnici as $radnik) {
            if ($radnik->imePrezime == $imePrezime) {
                $radnik->zahtevaniOdmor->od = "";
                $radnik->zahtevaniOdmor->do = "";
            }
        }
    }
    ;
    $zahtevi = json_encode($zaposleni);
    file_put_contents($filename, $zahtevi);
}
?>