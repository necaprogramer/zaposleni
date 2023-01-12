var zaposleni = {
    tim1:[
        {
            imePrezime: "Pera Peric",
            ugovor: "Odredjeno",
            brojPreostalihDanaOdmora: "0",
            uloga: "frontEnd",
        },
        {
            imePrezime: "Helena Mitanovic",
            ugovor: "Neodredjeno",
            brojPreostalihDanaOdmora: "0",
            uloga: "backEnd",
        },
        {
            imePrezime: "Misa Misic",
            ugovor: "Neodredjeno",
            brojPreostalihDanaOdmora: "2",
            uloga: "marketing",
        }
    ],
    tim2:[
        {
            imePrezime: "Djuro Nacic",
            ugovor: "Neodredjeno",
            brojPreostalihDanaOdmora: "2",
            uloga: "frontEnd"
        },
        {
            imePrezime: "Mika Pekanovic",
            ugovor: "Neodredjeno",
            brojPreostalihDanaOdmora: "0",
            uloga: "backEnd",
        },
        {
            imePrezime: "Rodoslav Karic",
            ugovor: "Neodredjeno",
            brojPreostalihDanaOdmora: "0",
            uloga: "backEnd",
            odmor:{
                od: "2023-04-05",
                do: "2023-04-25"
            }
        },
        {
            imePrezime: "Sloba Ropcevic",
            ugovor: "Odredjeno",
            brojPreostalihDanaOdmora: "0",
            uloga: "marketing",
        }
    ],
    tim3:[
        {
            imePrezime: "Anastasija Hljebljanovic",
            ugovor: "Neodredjeno",
            brojPreostalihDanaOdmora: "2",
            uloga: "frontEnd"
        },
        {
            imePrezime: "Mica Jaksic",
            ugovor: "Odredjeno",
            brojPreostalihDanaOdmora: "0",
            uloga: "backEnd",
        },
        {
            imePrezime: "Alkibijad Arnautovic",
            ugovor: "Neodredjeno",
            brojPreostalihDanaOdmora: "0",
            uloga: "marketing",
        }
    ],
};

/* TEST */
const danas = new Date();
const danas1 = new Intl.DateTimeFormat("sr", {
    dateStyle: "short",
});
console.log(danas - danas);
let nekiDrugiDan = new Date("July 21, 2024 00:00:00");
console.log((nekiDrugiDan - danas));

let odmorContainer = document.getElementById("odmor-container");

let form = document.createElement('div');
form.setAttribute('id', 'odmori-forma');
form.setAttribute('method', 'post');
odmorContainer.appendChild(form);

let odabirTima = document.createElement('select');
odabirTima.setAttribute('id', 'odabir-tima');
form.appendChild(odabirTima);

for(let tim in zaposleni){
    let timovi = document.createElement('option');
    timovi.value = tim;
    timovi.text = tim;
    odabirTima.appendChild(timovi);
}

let odabirImenaPrezimena = document.createElement('select');
odabirImenaPrezimena.setAttribute('id', 'ime-prezime');
form.appendChild(odabirImenaPrezimena);

odabirTima.addEventListener('change', () => {
    zaposleni[odabirTima.value].forEach(zaposlen => {
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
form.appendChild(odabirVremenaOd);

let naslovVremeDo = document.createElement('label');
naslovVremeDo.innerText = "Kraj odmora";
form.appendChild(naslovVremeDo);
let odabirVremenaDo = document.createElement('input');
odabirVremenaDo.setAttribute('type', 'date');
form.appendChild(odabirVremenaDo);

let proveraDatuma = document.createElement('button');
proveraDatuma.innerText = "Proveri dostupnost datuma";
form.appendChild(proveraDatuma);
proveraDatuma.addEventListener('click', () => {
    let jedanDan = 1000 * 60 * 60 * 24;
    // Racunanje broj odabranih dana radi provere logike
    let brojOdabranihDana = Math.round(Math.abs((Date.parse(odabirVremenaDo.value) - Date.parse(odabirVremenaOd.value)))/jedanDan);
    if(brojOdabranihDana < 0){
        alert("Morate odabrati makar jedan dan za odmor!");
    }
    // Formatiranje datuma od radi lakse provere logike
    let deloviDatuma = odabirVremenaOd.value.split("-");
    let mesecOd = parseInt(deloviDatuma[1]);
    let ulogaZaposlenogZaZahtev;
    zaposleni[odabirTima.value].forEach(zaposlen => {
        if(odabirImenaPrezimena.value == zaposlen.imePrezime){
            ulogaZaposlenogZaZahtev = zaposlen.uloga;
            let ukupanBrojDanaOdmora = 0;
            if(zaposlen.ugovor == "Neodredjeno"){
                if(mesecOd != 7){
                    ukupanBrojDanaOdmora = 20 + parseInt(zaposlen.brojPreostalihDanaOdmora);
                    checkPeriod(brojOdabranihDana, ukupanBrojDanaOdmora);
                }else{
                    ukupanBrojDanaOdmora = 20;
                    checkPeriod(brojOdabranihDana, ukupanBrojDanaOdmora);
                }
            }else if(zaposlen.ugovor == "Odredjeno"){
                ukupanBrojDanaOdmora = 20/12 * mesecOd;
                checkPeriod(brojOdabranihDana, ukupanBrojDanaOdmora);
            }
        }
    });
    zaposleni[odabirTima.value].forEach(zaposlen => {

    });
});

let submitButton = document.createElement('button');
submitButton.setAttribute('type', 'submit');
submitButton.innerText = "Posalji zahtev";
form.appendChild(submitButton);

function potvrdiIspravnostDatuma(dan, mesec, godina){
    let limitDana = 31;
    let limitMeseci = 12;
    let limitGodine = 23;

    if(godina < limitGodine || godina > limitGodine || mesec < 0 || mesec > limitMeseci || dan > limitDana){
        alert(`Datum nije ispravno unesen!`);
    }
}

function izracunajBrojDanaUGodini(dani, mesec){
    let meseci = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let ukupanBrojDana = dani;
    for(let i = 0; i < mesec - 1; i++){
        ukupanBrojDana += meseci[i];
    }
    return ukupanBrojDana;
}

function checkPeriod(dani, maksDana){
    if(dani > maksDana){
        alert(`Imate ${maksDana} dana odmora!`);
    }
}