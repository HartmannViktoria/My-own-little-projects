//Ez egy egyszerű TODO lista alkalmazás egyik alapvető funkcióját valósítja meg, a feladatok hozzáadását és törlését.
//A kódot tanulás céljából készítettem Shantanu Jana tutorialja alapján. https://foolishdeveloper.com/todo-list-javascript/

//A kód megkeresi az "hozzaad" azonosítóval ellátott gombot és hozzáad egy eseményfigyelőt, ami akkor fut le, amikor a gombra kattintunk. Az eseményfigyelőben ellenőrzi, hogy az új feladat beviteli mező tartalma üres-e, és ha igen, akkor egy figyelmeztető üzenetet jelenít meg. Ha a beviteli mező nem üres, akkor hozzáad egy új feladatot a "feladatok" id-jú HTML elemhez.

//A kód HTML kódot generál, amely egy div elemet hoz létre a "feladat" osztállyal, és az új feladat nevét tartalmazó span elemet, valamint egy "torles" osztállyal ellátott törlés gombot tartalmaz. A kód az összes törlés gombhoz eseményfigyelőt ad hozzá, hogy azokat töröljék a feladatok közül, amikor rájuk kattintanak. A törlés gomb SVG ikonját is beilleszti a kód a HTML kódba. (ez egy bootstrapes trash ikon)

//Először a "hozzaad" azonosítóval ellátott gombra kattintva meghívódik az eseménykezelő
//A querySelector visszatérési értékét a ! operátorral biztosítom, hogy az elem nem null.



function UjFeladatHozzaadasa(): string[] {
  const input = document.querySelector<HTMLInputElement>("#ujfeladat input")!;
  const inputErtek = input.value.trim();

  if (inputErtek.length === 0) {
    alert("Kérlek adj meg egy új feladatot!");
    return FeladatokLekerdezese();
  }

  const feladat = FeladatokLekerdezese();
  feladat.push(inputErtek);

  //Ha a felhasználó bezárja az oldalt és újra megnyitja, akkor a feladatok listája továbbra is megmarad, amit a JSON.parse() használatával később vissza is lehet alakítani eredeti formátumba
  localStorage.setItem("teendok", JSON.stringify(feladat));

  const feladatok = document.querySelector("#feladatok")!;
  feladatok.innerHTML += `
    <div class="feladat">
      <span id="feladatNeve">${inputErtek}</span>
      <button class="torles btn btn-danger">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
      </svg>
      </button>
    </div>
  `;

  const aktualisFeladat = document.querySelectorAll(".torles");
  for (let i = 0; i < aktualisFeladat.length; i++) {
    aktualisFeladat[i].addEventListener("click", function () {
      const parent = this.parentNode!;
      const feladatNeve = parent.querySelector("#feladatNeve")!.textContent!;
      const index = feladat.indexOf(feladatNeve);
      feladat.splice(index, 1);
      localStorage.setItem("teendok", JSON.stringify(feladat));
      parent.remove();
    });
  }

  return feladat;
}


function FeladatokLekerdezese(): string[] {
  const mentettFeladat = localStorage.getItem("teendok");
  if (mentettFeladat) {
    return JSON.parse(mentettFeladat);
  }
  return [];
}

document.querySelector("#hozzaad")!.addEventListener("click", function ():void {
  UjFeladatHozzaadasa();
});




/*
Az eredeti kód:
document.querySelector("#push").onclick = function(){
  if(document.querySelector("#newtask input").value.length == 0){
      alert("Please Enter a Task")
  }
  else{
      document.querySelector("#tasks").innerHTML += `
          <div class="task">
              <span id="taskname">
                  ${document.querySelector("#newtask input").value}
              </span>
              <button class="delete">
                  <i class="far fa-trash-alt"></i>
              </button>
          </div>
      `;
      var current_tasks = document.querySelectorAll(".delete");
      for(var i=0; i<current_tasks.length; i++){
          current_tasks[i].onclick = function(){
              this.parentNode.remove();
          }
      }
  }
}
*/