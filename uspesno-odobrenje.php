<?php
$imePrezime = htmlspecialchars($_POST['da-dugme']);
$filename = 'zaposleni.json';
if (file_exists($filename)) {
    $data = file_get_contents($filename);
    $zaposleni = json_decode($data);

    foreach ($zaposleni as $tim => $radnici) {
        foreach ($radnici as $radnik) {
            if ($radnik->imePrezime == $imePrezime) {
                // Kreiranje novog odmora u JSONu
                $periodOdmora = new stdClass;
                $periodOdmora->od = $radnik->zahtevaniOdmor->od;
                $periodOdmora->do = $radnik->zahtevaniOdmor->do;
                array_push($radnik->odmor, $periodOdmora);
                // Formatiranje u DateTime objektu radi iskoriscavanja DateTime::diff() funkcije
                $formatiraniDatumOd = new DateTime($periodOdmora->od);
                $formatiraniDatumDo = new DateTime($periodOdmora->do);
                $interval = $formatiraniDatumOd->diff($formatiraniDatumDo);
                $brojDanaPeriodaOdmora = $interval->format('%a') + 1; // + 1 jer se racuna i dan pocetka odmora
                // Obracunavanje broja dana vikenda za zadati period
                $brojDanaVikenda = 0;
                for ($i = 1; $i < $brojDanaPeriodaOdmora; $i++){
                    if($i % 6 == 0 || $i % 7 == 0){
                        $brojDanaVikenda++;
                    }
                }
                // Logika izracunavanja 
                $preostaliDaniOdmora = ($radnik->brojPreostalihDanaOdmora + $radnik->brojDanaOdmora + $brojDanaVikenda) - $brojDanaPeriodaOdmora;
                $radnik->brojDanaOdmora = "$preostaliDaniOdmora";
                // Resetovanje podataka
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