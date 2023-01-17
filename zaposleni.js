const DANAS = new Date();

const TRENUTNIDAN = DANAS.getDate();
const TRENUTNIMESEC = DANAS.getMonth();
const TRENUTNAGODINA = DANAS.getFullYear();

const DATUM = `${TRENUTNAGODINA}-0${TRENUTNIMESEC + 1}-${TRENUTNIDAN}`; // 0 ispred meseca i +1 jer getMonth racuna mesece od nule

const JEDANDAN = 1000 * 60 * 60 * 24;

dohvatiZaposlene();

async function dohvatiZaposlene() {
    const response = await fetch('./zaposleni.json');
    const data = await response.json();

    for (let timovi in data) {
        data[timovi].forEach(zaposlen => { // data od timova je u square bracket notaciji, jer dot notacija iz nekog razloga nije funkcionisala -> PROVERI OVO
            if (TRENUTNIMESEC > 6) { // Nepotrebno je pronalaziti zaposlene sa ugovorom na neodredjeno ukoliko trenutni mesec nije nakon 30og Juna
                if (zaposlen.ugovor == "Neodredjeno") {
                    zaposlen.brojPreostalihDanaOdmora == 0;
                }
            }
        });
    };

    let odmorContainer = document.getElementById("odmor-container");

    let form = document.createElement('form');
    form.setAttribute('id', 'odmori-forma');
    form.setAttribute('method', 'POST');
    form.setAttribute('action', 'zahtev-poslat.php');
    odmorContainer.appendChild(form);

    let odabirTima = document.createElement('select');
    odabirTima.setAttribute('id', 'odabir-tima');
    form.appendChild(odabirTima);

    for (let tim in data) {
        let timovi = document.createElement('option');
        timovi.value = tim;
        timovi.text = tim;
        odabirTima.appendChild(timovi);
    }

    let odabirImenaPrezimena = document.createElement('select');
    odabirImenaPrezimena.setAttribute('id', 'ime-prezime');
    odabirImenaPrezimena.setAttribute('name', 'ime-prezime');
    form.appendChild(odabirImenaPrezimena);

    odabirTima.addEventListener('change', () => {
        data[odabirTima.value].forEach(zaposlen => {
            let imenaPrezimena = document.createElement('option');
            imenaPrezimena.value = zaposlen.imePrezime;
            imenaPrezimena.text = zaposlen.imePrezime;

            odabirImenaPrezimena.appendChild(imenaPrezimena);
        });
    });

    let naslovVremeOd = document.createElement('label');
    naslovVremeOd.innerText = "Pocetak odmora";
    form.appendChild(naslovVremeOd);
    let odabirVremenaOd = document.createElement('input');
    odabirVremenaOd.setAttribute('type', 'date');
    odabirVremenaOd.setAttribute('name', 'vreme-od');
    form.appendChild(odabirVremenaOd);

    let naslovVremeDo = document.createElement('label');
    naslovVremeDo.innerText = "Kraj odmora";
    form.appendChild(naslovVremeDo);
    let odabirVremenaDo = document.createElement('input');
    odabirVremenaDo.setAttribute('type', 'date');
    odabirVremenaDo.setAttribute('name', 'vreme-do')
    form.appendChild(odabirVremenaDo);

    let submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.innerText = "Posalji zahtev";
    form.appendChild(submitButton);

    submitButton.addEventListener('click', (event) => {
        // Racunanje broja odabranih dana radi provere logike
        let brojOdabranihDana = Math.round(Math.abs((Date.parse(odabirVremenaDo.value) - Date.parse(odabirVremenaOd.value))) / JEDANDAN);
        
        if (brojOdabranihDana < 0) {
            event.preventDefault();
            alert("Morate odabrati makar jedan dan za odmor!");
        }

        // Formatiranje datuma od radi lakse provere logike
        let deloviDatuma = odabirVremenaOd.value.split("-");
        let mesecOd = parseInt(deloviDatuma[1]);

        let ulogaZaposlenogZaZahtev;

        data[odabirTima.value].forEach(zaposlen => {
            if (odabirImenaPrezimena.value == zaposlen.imePrezime) {

                ulogaZaposlenogZaZahtev = zaposlen.uloga;
                let ukupanBrojDanaOdmora = 0;

                // Proveri validnost zahtevanog datuma u odnosu na logiku datuma
                if (odabirVremenaOd.value < DATUM || odabirVremenaDo.value < DATUM) {
                    event.preventDefault();
                    alert("Ne mozete zahtevati odmor u proslosti!");
                } else if (odabirVremenaOd.value > odabirVremenaDo.value) {
                    event.preventDefault();
                    alert("Datum pocetka odmora ne sme biti u proslosti u odnosu na period do");
                }

                // Proveri validnost zahtevanog datuma u odnosu na logiku koja vazi za zaposlene
                if (zaposlen.ugovor == "Neodredjeno") {
                    if (zaposlen.zahtevaniOdmor['od'] != "" || zaposlen.zahtevaniOdmor['do'] == "") {
                        event.preventDefault()
                        alert("Vec ste podneli zahtev za odmor. Molimo Vas imajte strpljenja.");
                    } else {
                        if (mesecOd != 7) {
                            ukupanBrojDanaOdmora = 19 + parseInt(zaposlen.brojPreostalihDanaOdmora);
                            proveriPeriodOdmora(brojOdabranihDana, ukupanBrojDanaOdmora, event);
                        } else {
                            ukupanBrojDanaOdmora = 19;
                            proveriPeriodOdmora(brojOdabranihDana, ukupanBrojDanaOdmora, event);
                        }
                    }
                } else if (zaposlen.ugovor == "Odredjeno") {
                    ukupanBrojDanaOdmora = 20 / 12 * mesecOd;
                    proveriPeriodOdmora(brojOdabranihDana, ukupanBrojDanaOdmora);
                }
            }
            if (ulogaZaposlenogZaZahtev == zaposlen.uloga) {
                if (zaposlen.odmor) {
                    if (zaposlen.odmor.od == odabirVremenaOd.value || zaposlen.odmor.do == odabirVremenaDo.value) {
                        event.preventDefault();
                        alert("Nazalost Vas kolega je odabrao odmor u istom vremenskom periodu");
                    }
                }
            }
        });
    });
}

function proveriPeriodOdmora(dani, maksDana, klik) {
    if (dani > maksDana) {
        klik.preventDefault();
        alert(`Imate ${maksDana} dana odmora!`);
    }
}