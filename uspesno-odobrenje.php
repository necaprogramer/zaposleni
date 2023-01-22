<?php
$imePrezime = htmlspecialchars($_POST['da-dugme']);
$filename = 'zaposleni.json';
if (file_exists($filename)) {
    $data = file_get_contents($filename);
    $zaposleni = json_decode($data);

    foreach ($zaposleni as $tim => $radnici) {
        foreach ($radnici as $radnik) {
            if ($radnik->imePrezime == $imePrezime) {
                $periodOdmora = new stdClass;
                $periodOdmora->od = $radnik->zahtevaniOdmor->od;
                $periodOdmora->do = $radnik->zahtevaniOdmor->do;
                array_push($radnik->odmor, $periodOdmora);
                $brojDanaPeriodaOdmora = (strtotime($periodOdmora->do) - strtotime($periodOdmora->od)) / 60 / 60 / 24;
                $radnik->brojDanaOdmora = ($radnik->brojPreostalihDanaOdmora + $radnik->brojDanaOdmora) - $brojDanaPeriodaOdmora;
                $radnik->zahtevaniOdmor->od = "";
                $radnik->zahtevaniOdmor->do = "";
                print "Uspesno ste odobrili zahtev " . $radnik->imePrezime . " u periodu od " . $periodOdmora->od . " do " . $periodOdmora->do;
            }
        }
    };
    $zahtevi = json_encode($zaposleni);
    file_put_contents($filename, $zahtevi);
}
?>