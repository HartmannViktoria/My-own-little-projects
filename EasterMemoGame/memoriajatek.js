/*
Ez egy memóriajátékot megvalósító kódrészlet. A kód elején különböző változók létrehozása és a szükséges HTML elemek kiválasztása történik. 
A kartyaLapok változóban egy tömbben találhatók a játékban szereplő kártyák adatai. 
A RandomGenerator függvény létrehoz egy véletlenszerű kártyalapot, amelyet a MatrixGenerator függvény használ fel a játéktábla generálásához. 
Az IdoGenerator függvény a játékidőt számolja, a LepesSzamlalo pedig a játékos lépésszámát. 
A játék futása során a kartyak változóba kerülnek a játéktáblán található kártyák. 
Ha a játékos megfordít két kártyát, azokat a data-kartya-value attribútumuk alapján összehasonlítja, és ha azok egyeznek, akkor a egyezik osztályt adja hozzájuk. Ha az összes kártyát megtalálta a játékos, akkor a gyozelmekSzama egyenlő lesz a kártyák számának felével, és a játék véget ér.

A kódot tanulás céljából készítettem Coding Artist tutorialja alapján. https://codingartistweb.com/2022/06/memory-game-javascript-project/ 
*/

let lepesek = document.querySelector("#lepesek");
let ido = document.querySelector("#ido");
let startButton = document.querySelector("#start");
let stopButton = document.querySelector("#stop");
let jatekFelulet = document.querySelector(".jatekFelulet");
let eredmeny = document.querySelector("#eredmeny");
let kezdoKepernyo = document.querySelector(".kezdoKepernyo");
let kartyak;
let intervallum;
let elsoKartya = false;
let masodikKartya = false;

let kartyaLapok = [
    { name: "nyuszi1", image: "img/nyuszi1.JPG" },
    { name: "nyuszi2", image: "img/nyuszi2.JPG" },
    { name: "nyuszi3", image: "img/nyuszi3.JPG" },
    { name: "nyuszi4", image: "img/nyuszi4.JPG" },
    { name: "nyuszi5", image: "img/nyuszi5.JPG" },
    { name: "nyuszi6", image: "img/nyuszi6.JPG" },
    { name: "nyuszi7", image: "img/nyuszi7.JPG" },
    { name: "nyuszi8", image: "img/nyuszi8.JPG" },
    { name: "nyuszi9", image: "img/nyuszi9.JPG" },
    { name: "nyuszi10", image: "img/nyuszi10.JPG" },
    { name: "nyuszi11", image: "img/nyuszi11.JPG" },
    { name: "nyuszi12", image: "img/nyuszi12.JPG" },
];

let masodperc = 0; 
let perc = 0;
let lepesekSzama = 0; 
let gyozelmekSzama = 0; 

function IdoGenerator() {
    masodperc += 1; 

    if (masodperc >= 60) {
        perc += 1; 
        masodperc = 0;
    }
    
    let masodpercErtek = masodperc < 10 ? `0${masodperc}` : masodperc;
    let percErtek = perc < 10 ? `0${perc}` : perc;
    ido.innerHTML = `<span>Idő: </span>${percErtek}:${masodpercErtek}`;
}

function LepesSzamlalo() {
    lepesekSzama += 1;
    lepesek.innerHTML = `<span>Lépések száma:</span>${lepesekSzama}`;
}

function RandomGenerator(meret = 4) {
    let generaltTomb = [...kartyaLapok]; 
    let kartyaErtek = []; 
    meret = (meret * meret) / 2; 
    for (let i = 0; i < meret; i++) {
        let randomIndex = Math.floor(Math.random() * generaltTomb.length); 
        kartyaErtek.push(generaltTomb[randomIndex]);
        generaltTomb.splice(randomIndex, 1); 
    }
    return kartyaErtek;
}

function MatrixGenerator(kartyaErtek, meret = 4) {
    jatekFelulet.innerHTML = "";
    kartyaErtek = [...kartyaErtek, ...kartyaErtek];
    kartyaErtek.sort(() => Math.random() - 0.5);
    for (let i = 0; i < meret * meret; i++) {
        jatekFelulet.innerHTML += `
     <div class="kartyaFelulet" data-kartya-value="${kartyaErtek[i].name}">
        <div class="kartyaHatulja"></div>
        <div class="kartyaSzine"><img src="${kartyaErtek[i].image}" class="image"/></div>
     </div>
     `;
    }

    jatekFelulet.style.gridTemplateColumns = `repeat(${meret},auto)`;

    kartyak = document.querySelectorAll(".kartyaFelulet");
    kartyak.forEach((kartya) => {
        kartya.addEventListener("click", () => {

            if (!kartya.classList.contains("egyezik")) {
                kartya.classList.add("flipped");
                if (!elsoKartya) {
                    elsoKartya = kartya;
                    elsoKartyaErtek = kartya.getAttribute("data-kartya-value");
                }

                else {
                    LepesSzamlalo();
                    masodikKartya = kartya;
                    let masodikKartyaErtek = kartya.getAttribute("data-kartya-value");
                    if (elsoKartyaErtek == masodikKartyaErtek) {
                        elsoKartya.classList.add("egyezik");
                        masodikKartya.classList.add("egyezik");
                        elsoKartya = false;
                        gyozelmekSzama += 1;

                        if (gyozelmekSzama == Math.floor(kartyaErtek.length / 2)) {
                            eredmeny.innerHTML = `<h2>Gratulálok, nyertél!</h2>
                            <h4>Lépések száma: ${lepesekSzama}</h4>`;
                            Stop();
                        }
                    }

                    else {
                        let [tempFirst, tempSecond] = [elsoKartya, masodikKartya];
                        elsoKartya = false;
                        masodikKartya = false;
                        let delay = setTimeout(() => {
                            tempFirst.classList.remove("flipped");
                            tempSecond.classList.remove("flipped");
                        }, 900);
                    }
                }
            }
        });
    });
};

startButton.addEventListener("click", Start);
function Start() {
    lepesekSzama = 0;
    masodperc = 0;
    perc = 0;

    kezdoKepernyo.classList.add("elrejt");
    stopButton.classList.remove("elrejt");
    startButton.classList.add("elrejt");

    intervallum = setInterval(IdoGenerator, 1000);

    lepesek.innerHTML = `<span>Lépések száma: </span> ${lepesekSzama}`;
    Letrehoz();
};


stopButton.addEventListener("click", Stop);
function Stop() {
    kezdoKepernyo.classList.remove("elrejt");
    stopButton.classList.add("elrejt");
    startButton.classList.remove("elrejt");
    clearInterval(intervallum);
};



function Letrehoz() {
    eredmeny.innerText = "";
    gyozelmekSzama = 0;
    let kartyaErtek = RandomGenerator();
    console.log(kartyaErtek);
    MatrixGenerator(kartyaErtek);
}; 

