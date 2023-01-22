<?php
$trenutniMesec = date('m');

$filename = 'zaposleni.json';
if(file_exists($filename)){
    $data = file_get_contents($filename);
    $zaposleni = json_decode($data);

    foreach($zaposleni as $tim=>$radnici){
        foreach($radnici as $radnik){
            if($radnik->ugovor == "Neodredjeno"){
                if($trenutniMesec == 1){
                    $radnik->brojDanaOdmora = "20";
                }else if($radnik->brojDanaOdmora == "0" && $trenutniMesec > 1){
                    $radnik->brojDanaOdmora == "20";
                }else if($trenutniMesec == 7){
                    $radnik->brojPreostalihDanaOdmora = "0";
                }
            }
        }
    };
    $zahtevi = json_encode($zaposleni);
    file_put_contents($filename, $zahtevi);
}
?>