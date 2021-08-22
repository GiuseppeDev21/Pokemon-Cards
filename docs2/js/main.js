const input = document.querySelector("#pokemon");
const boton = document.querySelector("#boton");
const div = document.querySelector(".poke__container");

boton.addEventListener("click", (e) => {
  e.preventDefault();
  Pokemon(input.value.toLowerCase());
});

const Pokemon = (pokemon) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
    .then((resp) => resp.json())
    .then((data) => crearPokemon(data))
    .catch((error) =>
      Swal.fire({
        icon: "error",
        title: "Something went wrong...",
        text: "Try to check again the Pokemon name!",
      })
    );
};


const crearPokemon = (pokemon) => {
  const poke__cardB = document.createElement("div");
  poke__cardB.setAttribute("class", "poke__cardB");

  let eleicon = [];

  pokemon.types.forEach((element) => {
    poke__algo = element.type.name;
    if (eleicon[0] != poke__algo) {
      let nada = eleicon.push(poke__algo);
       alert("elemento :"+ eleicon[0]);
       alert("elemento :"+ eleicon[1]);
       console.log(nada);
       console.log(eleicon);
      }
  });
    // alert(eleicon[0]+" elemento 0");
    poke__cardB.setAttribute("id", eleicon[0]);
    
    console.log(eleicon);
    const poke__cardB_d1 = document.createElement("div");
    poke__cardB_d1.setAttribute("class", "poke__cardB--d1");
    
    const poke__cardB_d2 = document.createElement("div");
    poke__cardB_d2.setAttribute("class", "poke__cardB--d2");
    
    const pimg = document.createElement("img");
    pimg.src = pokemon.sprites.front_default;
    pimg.setAttribute("class", "poke__img");
    
    const poke__name = document.createElement("p");
    poke__name.setAttribute("class", "poke__name");
    poke__name.textContent = pokemon.name;
    
    const poke__id = document.createElement("p");
    poke__id.setAttribute("class", "poke__id");
    poke__id.textContent = "#" + pokemon.id;
    

    if(eleicon[0] != undefined){
      const poke__element = document.createElement("img");
      poke__element.src ="./resources/types/"+eleicon[0]+".png";
      poke__element.setAttribute("class","poke__element-1");
      poke__cardB_d1.appendChild(poke__element);
    } 
    if(eleicon[1] != undefined){
      const poke__element2 = document.createElement("img");
      poke__element2.src ="./resources/types/"+eleicon[1]+".png";
      poke__element2.setAttribute("class","poke__element-2");
      poke__cardB_d1.appendChild(poke__element2);  
    }
    
    
    div.appendChild(poke__cardB);
    poke__cardB.appendChild(poke__cardB_d1);
    poke__cardB.appendChild(poke__cardB_d2);
    poke__cardB_d1.appendChild(pimg);
    poke__cardB_d1.appendChild(poke__name);
    poke__cardB_d1.appendChild(poke__id);
    
    const poke__abilitie = document.createElement("h1");
    poke__abilitie.textContent = "ABILITIES";
    poke__cardB_d2.appendChild(poke__abilitie);

    const poke__cardB_d2_div = document.createElement("div");
    poke__cardB_d2_div.setAttribute("class", "poke__abilities");
    poke__cardB_d2.appendChild(poke__cardB_d2_div);
    
    let poke__abilitie_name = document.createElement("p");
    pokemon.abilities.forEach((element) => {
      poke__abilitie_name = document.createElement("p");
      poke__abilitie_name.textContent = element.ability.name;
    poke__cardB_d2_div.appendChild(poke__abilitie_name);
  });
  
  const poke__BaseStats = document.createElement("h1");
  poke__BaseStats.textContent = "BASE STATS";
  poke__cardB_d2.appendChild(poke__BaseStats);
  
  const poke__basestats_1 = document.createElement("div");
  poke__basestats_1.setAttribute("class", "poke__basestats-1");
  poke__cardB_d2.appendChild(poke__basestats_1);
  
  const poke__basestats_2 = document.createElement("div");
  poke__basestats_2.setAttribute("class", "poke__basestats-2");
  poke__cardB_d2.appendChild(poke__basestats_2);
  
  const poke__stat_hp = document.createElement("p");
  poke__stat_hp.textContent =
  pokemon.stats[0].stat.name.toUpperCase() +
  ": " +
  pokemon.stats[0].base_stat;
  poke__basestats_1.appendChild(poke__stat_hp);
  
  const poke__stat_attack = document.createElement("p");
  poke__stat_attack.textContent =
  pokemon.stats[1].stat.name.toUpperCase() +
  ": " +
  pokemon.stats[1].base_stat;
  poke__basestats_1.appendChild(poke__stat_attack);
  
  const poke__stat_defense = document.createElement("p");
  poke__stat_defense.textContent =
  pokemon.stats[2].stat.name.toUpperCase() +
  ": " +
  pokemon.stats[2].base_stat;
  poke__basestats_1.appendChild(poke__stat_defense);
  
  const poke__stat_speed = document.createElement("p");
  poke__stat_speed.textContent =
  pokemon.stats[5].stat.name.toUpperCase() +
  ": " +
  pokemon.stats[5].base_stat;
  poke__basestats_2.appendChild(poke__stat_speed);
  
  const poke__stat_attack_special = document.createElement("p");
  poke__stat_attack_special.textContent =
  pokemon.stats[4].stat.name.toUpperCase() +
  ": " +
  pokemon.stats[4].base_stat;
  poke__basestats_2.appendChild(poke__stat_attack_special);

  const poke__stat_defense_special = document.createElement("p");
  poke__stat_defense_special.textContent =
  pokemon.stats[3].stat.name.toUpperCase() +
  ": " +
  pokemon.stats[3].base_stat;
  poke__basestats_2.appendChild(poke__stat_defense_special);
};

const doc = document;
const menuOpen = doc.querySelector(".menu");
const menuClose = doc.querySelector(".close");
const overlay = doc.querySelector(".overlay");

menuOpen.addEventListener("click", () => {
  overlay.classList.add("overlay--active");
});

menuClose.addEventListener("click", () => {
  overlay.classList.remove("overlay--active");
});
