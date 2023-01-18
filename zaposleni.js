// NAKON STO JE DODLJEN ODMOR PRETHODNI DANI ODMORA SU 0
// VIKENDI NE SMEJU DA SE RACUNAJU KAO ODMOR

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
                let ukupanBrojDanaOdmora = 19;
                event.preventDefault();
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
                    // Ukoliko vec postoji zahtev za odmor
                    if (zaposlen.zahtevaniOdmor['od'] != "" && zaposlen.zahtevaniOdmor['do'] != "") {
                        event.preventDefault()
                        alert("Vec ste podneli zahtev za odmor. Molimo Vas imajte strpljenja.");
                    } else {
                        // Ukoliko postoji drugi period odmora
                        if (zaposlen['odmor'] != "") {
                            zaposlen['odmor'].forEach(periodOdmora => {
                                if (periodOdmora.od == odabirVremenaOd.value && periodOdmora.do == odabirVremenaDo.value) {
                                    event.preventDefault();
                                    alert("Ne mozete zahtevati novi odmor u istom vremenskom periodu!");
                                } else {
                                    ukupanBrojDanaOdmora = ukupanBrojDanaOdmora - izracunajRazliku(periodOdmora.od, periodOdmora.do);
                                }
                            });
                        }
                            if (mesecOd != 7) {
                                ukupanBrojDanaOdmora += parseInt(zaposlen.brojPreostalihDanaOdmora);
                                proveriPeriodOdmora(brojOdabranihDana, ukupanBrojDanaOdmora, event);
                            } else {
                                izracunajDaneVikenda(odabirVremenaOd.value, odabirVremenaDo.value);
                                proveriPeriodOdmora(brojOdabranihDana, ukupanBrojDanaOdmora, event);
                            };
                    };
                } else if (zaposlen.ugovor == "Odredjeno") {
                    ukupanBrojDanaOdmora = 20 / 12 * mesecOd;
                    proveriPeriodOdmora(brojOdabranihDana, Math.floor(ukupanBrojDanaOdmora), event);
                };
            };

            if (ulogaZaposlenogZaZahtev == zaposlen.uloga) {
                if (odabirImenaPrezimena.value != zaposlen.imePrezime) {
                    if (zaposlen.odmor) {
                        zaposlen['odmor'].forEach(odmori => {
                            if (odmori['od'] == odabirVremenaOd.value && odmori['do'] == odabirVremenaDo.value) {
                                event.preventDefault();
                                alert("Nazalost Vas kolega je odabrao odmor u istom vremenskom periodu");
                            };
                        })
                    }
                };
            };
        });
    });
}

function proveriPeriodOdmora(dani, maksDana, klik) {
    if (dani > maksDana) {
        klik.preventDefault();
        alert(`Imate ${maksDana} dana odmora!`);
    }
}

function izracunajRazliku(datum1, datum2) {
    let formatiraniDatum1 = datum1.split('-');
    let formatiraniDatum2 = datum2.split('-');

    let godinaDatum1 = parseInt(formatiraniDatum1[0])
    let mesecDatum1 = parseInt(formatiraniDatum1[1]);
    let danDatum1 = parseInt(formatiraniDatum1[2]);

    let godinaDatum2 = parseInt(formatiraniDatum2[0]);
    let mesecDatum2 = parseInt(formatiraniDatum2[1]);
    let danDatum2 = parseInt(formatiraniDatum2[2]);

    return Math.abs(godinaDatum1 - godinaDatum2 + mesecDatum1 - mesecDatum2 + danDatum1 - danDatum2);
}

function izracunajDaneVikenda(datumOd, datumDo){
    let dani = izracunajRazliku(datumOd, datumDo);
    let danOd = new Date(datumOd);
    console.log(danOd.getDay());
}