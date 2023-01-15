<?php
$imePrezime = htmlspecialchars($_POST['ime-prezime']);
$vremeOd = htmlspecialchars($_POST['vreme-od']);
$vremeDo = htmlspecialchars($_POST['vreme-do']);

echo $imePrezime . ", uspesno ste podneli zahtev administratoru za odmor u periodu od " . $vremeOd . " do " . $vremeDo;

$filename = 'zaposleni.json';
if(file_exists($filename)){
    $data = file_get_contents($filename);
    $zaposleni = json_decode($data);
    
    foreach($zaposleni as $tim=>$radnici){
        foreach($radnici as $radnik){
            if($radnik->imePrezime == $imePrezime){
                $radnik->zahtevaniOdmor->od = $vremeOd;
                $radnik->zahtevaniOdmor->do = $vremeDo;
            }
        }
    };
    
    $zahtevi = json_encode($zaposleni);
    file_put_contents($filename, $zahtevi);
}
?>