var zaposleni = {
    tim1:[
        {
            ime: "Pera",
            prezime: "Peric",
            ugovor: "Neodredjeno",
            brojPreostalihDana: "2",
            uloga: "frontEnd"
        },
        {
            ime: "Djuro",
            prezime: "Mitic",
            ugovor: "Neodredjeno",
            brojPreostalihDana: "0",
            uloga: "backEnd",
        },
        {
            ime: "Misa",
            prezime: "Misic",
            ugovor: "Odredjeno",
            brojPreostalihDana: "0",
            uloga: "marketing",
        }
    ],
    tim2:[
        {
            ime: "Pera",
            prezime: "Peric",
            ugovor: "Neodredjeno",
            brojPreostalihDana: "2",
            uloga: "frontEnd"
        },
        {
            ime: "Djuro",
            prezime: "Mitic",
            ugovor: "Neodredjeno",
            brojPreostalihDana: "0",
            uloga: "backEnd",
        },
        {
            ime: "Misa",
            prezime: "Misic",
            ugovor: "Odredjeno",
            brojPreostalihDana: "0",
            uloga: "marketing",
        }
    ],
    tim3:[
        {
            ime: "Pera",
            prezime: "Peric",
            ugovor: "Neodredjeno",
            brojPreostalihDana: "2",
            uloga: "frontEnd"
        },
        {
            ime: "Djuro",
            prezime: "Mitic",
            ugovor: "Neodredjeno",
            brojPreostalihDana: "0",
            uloga: "backEnd",
        },
        {
            ime: "Misa",
            prezime: "Misic",
            ugovor: "Odredjeno",
            brojPreostalihDana: "0",
            uloga: "marketing",
        }
    ]
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

let odabirImena = document.createElement('select');
form.appendChild(odabirImena);

let odabirPrezimena = document.createElement('select');
form.appendChild(odabirPrezimena);

odabirTima.addEventListener('change', () => {
    zaposleni[odabirTima.value].forEach(zaposlen => {
        let imena = document.createElement('option');
        let prezimena = document.createElement('option');
        imena.value = zaposlen.ime;
        imena.text = zaposlen.ime;
        prezimena.value = zaposlen.prezime;
        prezimena.text = zaposlen.prezime;

        odabirImena.appendChild(imena);
        odabirPrezimena.appendChild(prezimena);
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