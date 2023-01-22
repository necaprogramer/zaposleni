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
                echo "</br> $brojDanaPeriodaOdmora \n";
                for ($i = 1; $i < $brojDanaPeriodaOdmora; $i++){
                    if($i % 6 == 0 || $i % 7 == 0){
                        $brojDanaPeriodaOdmora++;
                    }
                }
                echo "</br> $radnik->brojDanaOdmora \n";
                $preostaliDaniOdmora = ($radnik->brojPreostalihDanaOdmora + $radnik->brojDanaOdmora) - $brojDanaPeriodaOdmora;
                $radnik->brojDanaOdmora = "$preostaliDaniOdmora";
                $radnik->brojPreostalihDanaOdmora = "0";
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