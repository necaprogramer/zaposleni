// PROVERI ZASTO MORA DA SE OBRISE KES KADA SE PODNESE NOVI ZAHTEV ZA ODMOR KAKO BI SE PRIKAZAO

let adminPanelContainer = document.getElementById('container');

dohvatiZaposleneSaZahtevima();

async function dohvatiZaposleneSaZahtevima(){
    const response = await fetch('./zaposleni.json');
    const data = await response.json();
    
    for(let timovi in data){
        data[timovi].forEach(zaposlen => {
            if(zaposlen.zahtevaniOdmor['od'] != "" && zaposlen.zahtevaniOdmor['do'] != ""){ // U square bracket notaciji, jer dot notacija je pravila probleme
                let zahtev = document.createElement('h4');
                adminPanelContainer.appendChild(zahtev);

                zahtev.innerText = zaposlen.imePrezime + " zahteva odmor u periodu od " + zaposlen.zahtevaniOdmor['od'] + " do " + zaposlen.zahtevaniOdmor['do'];

                let prihvatiDugme = document.createElement('button');
                prihvatiDugme.innerText = "Odobri";
                adminPanelContainer.appendChild(prihvatiDugme);
                let odbijDugme = document.createElement('button');
                odbijDugme.innerText = "Odbij zahtev";
                adminPanelContainer.appendChild(odbijDugme);

                prihvatiDugme.addEventListener('click', () => {
                    daLiSteSigurni(zaposlen.imePrezime, './uspesno-odobrenje.php');
                });
                odbijDugme.addEventListener('click', () => {
                    daLiSteSigurni(zaposlen.imePrezime, './uspesno-odbijanje.php');
                });
            }
        });
    }
}

function daLiSteSigurni(zaposleni, stranicaZaPotvrdu){
    let formaZaOdobrenje = document.createElement('form');
    formaZaOdobrenje.setAttribute('method', 'post');
    formaZaOdobrenje.setAttribute('action', stranicaZaPotvrdu);

    let daDugme = document.createElement('button');
    let neDugme = document.createElement('button');
    daDugme.innerText = "Da";
    neDugme.innerText = "Ne";
    daDugme.setAttribute('name', 'da-dugme');
    neDugme.setAttribute('id', 'ne-dugme');

    let daLiSteSigurniTekst = document.createElement('h3');
    daLiSteSigurniTekst.innerText = "Da li ste sigurni?";
    daLiSteSigurniTekst.setAttribute('id', 'da-li-ste-sigurni');

    adminPanelContainer.appendChild(daLiSteSigurniTekst);
    adminPanelContainer.appendChild(formaZaOdobrenje);
    formaZaOdobrenje.appendChild(daDugme);
    adminPanelContainer.appendChild(neDugme);

    /* AKCIJE UKOLIKO SE PRITISNU DA/NE DUGME */
    daDugme.setAttribute('action', 'submit');
    daDugme.setAttribute('value', zaposleni);

    neDugme.addEventListener('click', () => {
        formaZaOdobrenje.removeChild(daDugme);
        adminPanelContainer.removeChild(formaZaOdobrenje);
        adminPanelContainer.removeChild(neDugme);
        adminPanelContainer.removeChild(daLiSteSigurniTekst);
    });
}