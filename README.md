# zaposleni

Ideja je da se uradi prototipski zadatak koji ne mora da koristi bazu i API. Stoga, podaci o zaposlenima mogu biti sacuvani unutar JSON fajla, radi lakse evidencije i manipulacije podacima.

Postojace stranica rezervisane za zaposlene u sklopu koje ce biti mogucnost da odabira tima kom pripadaju, odabira punog imena, kao i datuma odmora u formatu od DD/MM/YYYY do DD/MM/YYYY.
Logika je iduca: 
1. Zaposleni, sa ugovorom za stalno, imaju 20 dana godisnjeg odmora od pocetka godine ili od dana pocetka ugovora
2. Zaposleni, sa ugovorom za stalno, mogu iskoristiti dane iz prethodne godine, ukoliko su zaposleni duze od godinu dana, a dani iz prethodne godine se vaze samo ukoliko se iskoriste do 30og Juna
3. Zaposleni, sa ugovorom na odredjeno, imaju broj dana po formuli: 20/12 * broj punih meseci u tekucoj godini
4. Zaposleni sa istim ulogama unutar timova ne mogu imati odmor u istom vremenskom periodu

Postojace stranica rezervisana za administratore u sklopu koje ce postojati mogucnost odobravanja ili neodobravanja odmora koji su validno zahtevani. Ukoliko je odmor odobren, zahtev za odmor se pretvara u odmor zaposlenog, a ukoliko je odbijen zahtev za odmor se resetuje tako da je radnik u mogucnosti podneti novi zahtev za odmor. Pri odobrenju/odbijanju odmora radnik se informise putem mejla?