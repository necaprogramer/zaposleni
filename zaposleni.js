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
odabirVremenaOd.setAttribute('type', 'text');
form.appendChild(odabirVremenaOd);

let naslovVremeDo = document.createElement('label');
naslovVremeDo.innerText = "Kraj odmora";
form.appendChild(naslovVremeDo);
let odabirVremenaDo = document.createElement('input');
odabirVremenaDo.setAttribute('type', 'text');
form.appendChild(odabirVremenaDo);

let proveraDatuma = document.createElement('button');
proveraDatuma.innerText = "Proveri dostupnost datuma";
form.appendChild(proveraDatuma);
proveraDatuma.addEventListener('click', () => {
    if(odabirVremenaOd.value == "" && odabirVremenaDo.value == ""){
        alert("Datum ne sme biti prazan!");
    }

    // Formatiranje datuma od radi lakse manipulacije
    let deloviDatumaOd = odabirVremenaOd.value.split("/");
    let danOd = parseInt(deloviDatumaOd[0]);
    let mesecOd = parseInt(deloviDatumaOd[1]);
    let godinaOd = parseInt(deloviDatumaOd[2]);
    
    // Formatiranje datuma do radi lakse manipulacije
    let deloviDatumaDo = odabirVremenaDo.value.split("/");
    let danDo = parseInt(deloviDatumaDo[0]);
    let mesecDo = parseInt(deloviDatumaDo[1]);
    let godinaDo = parseInt(deloviDatumaDo[2]);

    potvrdiIspravnostDatuma(danOd, mesecOd, godinaOd);
    potvrdiIspravnostDatuma(danDo, mesecDo, godinaDo);

    zaposleni[odabirTima.value].forEach(zaposlen => {
        if(odabirImenaPrezimena.value == zaposlen.imePrezime){
            if(zaposlen.ugovor == "Neodredjeno"){
                if(mesecOd + 1 < mesecDo){
                    alert("Imate 20 dana!");
                }
            }
        }
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