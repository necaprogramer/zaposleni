# zaposleni

Ideja je da se uradi prototipski zadatak koji ne mora da koristi bazu i API. Stoga, podaci o zaposlenima mogu biti sacuvani unutar JS objekta.

Postojace stranica rezervisane za zaposlene u sklopu koje ce biti mogucnost da odabira tima kom pripadaju, unos svog ima i prezima kao i datuma odmora u formatu od DD/MM/YY do DD/MM/YY.
Logika je iduca: 
1. Zaposleni, sa ugovorom za stalno, imaju 20 dana godisnjeg odmora od pocetka godine ili od dana pocetka ugovora
2. Dani iz prethodne godine se vaze samo ukoliko se iskoriste do 30og Juna
3. Zaposleni, sa ugovorom na odredjeno, imaju broj dana po formuli: 20/12 * broj punih meseci u tekucoj godini
4. Zaposleni sa istim ulogama unutar timova ne mogu imati odmor u istom vremenskom periodu

Postojace stranica rezervisana za administratore u sklopu koje ce postojati mogucnost odobravanja ili neodobravanja odmora koji su validno zahtevani