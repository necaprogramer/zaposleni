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

/*
praviPoljaZaUnos("ime", "imePolje");
praviPoljaZaUnos("prezime", "prezimePolje");

function praviPoljaZaUnos(nazivNaslova, nazivPolja){
    let naziv = `${nazivNaslova}`;
    nazivNaslova = document.createElement('label');
    nazivNaslova.innerText = `Vase ${naziv}`;

    nazivPolja = document.createElement('input');
    nazivPolja.setAttribute('type', 'text');

    form.appendChild(nazivNaslova);
    form.appendChild(nazivPolja);
}
*/