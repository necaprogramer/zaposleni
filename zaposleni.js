var zaposleni = {
    tim1:[
        {
            imePrezime: "Pera Peric",
            ugovor: "Odredjeno",
            brojPreostalihDana: "0",
            uloga: "frontEnd"
        },
        {
            imePrezime: "Helena Mitanovic",
            ugovor: "Neodredjeno",
            brojPreostalihDana: "0",
            uloga: "backEnd",
        },
        {
            imePrezime: "Misa Misic",
            ugovor: "Neodredjeno",
            brojPreostalihDana: "2",
            uloga: "marketing",
        }
    ],
    tim2:[
        {
            imePrezime: "Djuro Nacic",
            ugovor: "Neodredjeno",
            brojPreostalihDana: "2",
            uloga: "frontEnd"
        },
        {
            imePrezime: "Mika Pekanovic",
            ugovor: "Neodredjeno",
            brojPreostalihDana: "0",
            uloga: "backEnd",
        },
        {
            imePrezime: "Sloba Ropcevic",
            ugovor: "Odredjeno",
            brojPreostalihDana: "0",
            uloga: "marketing",
        }
    ],
    tim3:[
        {
            imePrezime: "Anastasija Hljebljanovic",
            ugovor: "Neodredjeno",
            brojPreostalihDana: "2",
            uloga: "frontEnd"
        },
        {
            imePrezime: "Mica Jaksic",
            ugovor: "Odredjeno",
            brojPreostalihDana: "0",
            uloga: "backEnd",
        },
        {
            imePrezime: "Alkibijad Arnautovic",
            ugovor: "Neodredjeno",
            brojPreostalihDana: "0",
            uloga: "marketing",
        }
    ],
};

let odmorContainer = document.getElementById("odmor-container");

let form = document.createElement('div');
form.setAttribute('id', 'odmori-forma');
form.setAttribute('method', 'post');
odmorContainer.appendChild(form);

let odabirTima = document.createElement('select');
form.appendChild(odabirTima);

for(let tim in zaposleni){
    let timovi = document.createElement('option');
    timovi.value = tim;
    timovi.text = tim;
    odabirTima.appendChild(timovi);
}

let odabirImenaPrezimena = document.createElement('select');
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
odabirVremenaOd.setAttribute('type', 'text');
form.appendChild(odabirVremenaOd);

let naslovVremeDo = document.createElement('label');
naslovVremeDo.innerText = "Kraj odmora";
form.appendChild(naslovVremeDo);
let odabirVremenaDo = document.createElement('input');
odabirVremenaDo.setAttribute('type', 'text');
form.appendChild(odabirVremenaDo);


let submitButton = document.createElement('button');
submitButton.setAttribute('type', 'submit');
submitButton.innerText = "Posalji zahtev";
form.appendChild(submitButton);

submitButton.addEventListener('click', () => {
    validateDate(odabirVremenaOd.value);
    validateDate(odabirVremenaDo.value);
});

function validateDate(date){
    if(date == 0){
        alert("Datum nije unesen!");
    }

    let limitGodine = 23;
    let limitMeseci = 12;
    let limitDana = 31;

    let deloviDatuma = date.split("/");
    let dan = parseInt(deloviDatuma[0], 10);
    let mesec = parseInt(deloviDatuma[1], 10);
    let godina = parseInt(deloviDatuma[2], 10);

    if(godina < limitGodine || godina > limitGodine || mesec < 0 || mesec > limitMeseci || dan > limitDana){
        alert(`Datum nije ispravno unesen!`);
    }
}