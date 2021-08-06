const input = document.querySelector("#pokemon");
const boton = document.querySelector("#boton");
const div = document.querySelector(".poke__container");

boton.addEventListener("click", (e)=>{
    e.preventDefault();
    Pokemon(input.value.toLowerCase());
});

const Pokemon = (pokemon) =>{
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
     .then(resp => resp.json())
     .then(data => crearPokemon(data))
     .catch(error => alert(error))
 }
 
 const crearPokemon = (pokemon) => {
 
     const poke__cardB = document.createElement("div");
     poke__cardB.setAttribute("class","poke__cardB");
     
     const poke__cardB_d1 = document.createElement("div");
     poke__cardB_d1.setAttribute("class","poke__cardB--d1");
     
     const poke__cardB_d2 = document.createElement("div");
     poke__cardB_d2.setAttribute("class","poke__cardB--d2");
     
     const pimg = document.createElement("img");
     pimg.src = pokemon.sprites.front_default;
     pimg.setAttribute("class", "poke__img");
     
     const poke__name = document.createElement("p");
     poke__name.setAttribute('class','poke__name')
     poke__name.textContent = pokemon.name;

     const poke__id = document.createElement("p");
     poke__id.setAttribute('class','poke__id')
     poke__id.textContent = "#" + pokemon.id;

     const poke__element_1 = document.createElement("img");
     poke__element_1.setAttribute('class','poke__element--1');
     
      switch (pokemon.types[0].type.name) {
        case "bug"://metapod
         poke__cardB.setAttribute("class","poke__cardB");
         poke__cardB.setAttribute("id","bug");
         poke__element_1.src='img/bug.png' ;
         break;
        case "dark"://absol
         poke__cardB.setAttribute("class","poke__cardB");
         poke__cardB.setAttribute("id","dark");
         poke__element_1.src='img/dark.png' ;
         break;
        case "dragon"://dragonite
         poke__cardB.setAttribute("class","poke__cardB");
         poke__cardB.setAttribute("id","dragon");
         poke__element_1.src='img/dragon.png' ;
         break;
        case "electric"://pikachu
         poke__cardB.setAttribute("class","poke__cardB");
         poke__cardB.setAttribute("id","electric");
         poke__element_1.src='img/electric.png' ;
         break;
        case "fairy"://sylveon
         poke__cardB.setAttribute("class","poke__cardB");
         poke__cardB.setAttribute("id","fairy");
         poke__element_1.src='img/fairy.png' ;
         break;
        case "fighting"://machamp
         poke__cardB.setAttribute("class","poke__cardB");
         poke__cardB.setAttribute("id","fighting");
         poke__element_1.src='img/fighting.png' ;
         break;
         case "fire"://charizard
         poke__cardB.setAttribute("class","poke__cardB");
         poke__cardB.setAttribute("id","fire");
         poke__element_1.src='img/fire.png' ;
         break;
         case "flying"://noibat
         poke__cardB.setAttribute("class","poke__cardB");
         poke__cardB.setAttribute("id","flying");
         poke__element_1.src='img/flying.png' ;
         break;
         case "ghost"://gengar
         poke__cardB.setAttribute("class","poke__cardB");
         poke__cardB.setAttribute("id","ghost");
         poke__element_1.src='img/ghost.png' ;
         break;
         case "grass"://snivy
         poke__cardB.setAttribute("class","poke__cardB");
         poke__cardB.setAttribute("id","grass");
         poke__element_1.src='img/grass.png' ;
         break;
         case "ground"://drilbur
         poke__cardB.setAttribute("class","poke__cardB");
         poke__cardB.setAttribute("id","ground");
         poke__element_1.src='img/ground.png' ;
         break;
         case "ice"://glalie
         poke__cardB.setAttribute("class","poke__cardB");
         poke__cardB.setAttribute("id","ice");
         poke__element_1.src='img/ice.png' ;
         break;
         case "normal"://pidgeot
         poke__cardB.setAttribute("class","poke__cardB");
         poke__cardB.setAttribute("id","normal");
         poke__element_1.src='img/normal.png' ;
         break;
         case "poison"://muk
         poke__cardB.setAttribute("class","poke__cardB");
         poke__cardB.setAttribute("id","poison");
         poke__element_1.src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Pok%C3%A9mon_Fire_Type_Icon.svg/1200px-Pok%C3%A9mon_Fire_Type_Icon.svg.png' ;
         break;
         case "psychic"://gardevoir
         poke__cardB.setAttribute("class","poke__cardB");
         poke__cardB.setAttribute("id","psychic");
         poke__element_1.src='img/psychic.png' ;
         break;
         case "rock"://onix
         poke__cardB.setAttribute("class","poke__cardB");
         poke__cardB.setAttribute("id","rock");
         poke__element_1.src='img/rock.png' ;
         break;
         case "steel"://meltan
         poke__cardB.setAttribute("class","poke__cardB");
         poke__cardB.setAttribute("id","steel");
         poke__element_1.src='img/steel.png' ;
         break;
         case "water"://greninja
         poke__cardB.setAttribute("class","poke__cardB");
         poke__cardB.setAttribute("id","water");
         poke__element_1.src='img/water.png';
         break;
        default:
          break;
      }
    
     div.appendChild(poke__cardB);
     poke__cardB.appendChild(poke__cardB_d1);
     poke__cardB.appendChild(poke__cardB_d2)
     poke__cardB_d1.appendChild(pimg);
     poke__cardB_d1.appendChild(poke__element_1);
    //  poke__cardB_d1.appendChild(poke__element_2);
     poke__cardB_d1.appendChild(poke__name);
     poke__cardB_d1.appendChild(poke__id);
     
     const poke__abilitie = document.createElement("h1",);
     poke__abilitie.textContent = "ABILITIES";
     poke__cardB_d2.appendChild(poke__abilitie);
     
     const poke__cardB_d2_div = document.createElement('div');
     poke__cardB_d2_div.setAttribute('class','poke__abilities');
     poke__cardB_d2.appendChild(poke__cardB_d2_div);
     
     let poke__abilitie_name = document.createElement("p");
     pokemon.abilities.forEach(element =>{
       poke__abilitie_name = document.createElement("p");
       poke__abilitie_name.textContent = element.ability.name;
        poke__cardB_d2_div.appendChild(poke__abilitie_name);
    });

    const poke__BaseStats = document.createElement("h1",);
    poke__BaseStats.textContent = "BASE STATS";
    poke__cardB_d2.appendChild(poke__BaseStats);
    
    const poke__basestats_1 = document.createElement("div");
    poke__basestats_1.setAttribute('class','poke__basestats-1');
    poke__cardB_d2.appendChild(poke__basestats_1);
    
    const poke__basestats_2 = document.createElement("div");
    poke__basestats_2.setAttribute('class','poke__basestats-2');
    poke__cardB_d2.appendChild(poke__basestats_2);
    
    const poke__stat_hp =  document.createElement("p");
    poke__stat_hp.textContent = pokemon.stats[0].stat.name.toUpperCase() + ": " + pokemon.stats[0].base_stat;
    poke__basestats_1.appendChild(poke__stat_hp);

    const poke__stat_attack =  document.createElement("p");
    poke__stat_attack.textContent = pokemon.stats[1].stat.name.toUpperCase() + ": " + pokemon.stats[1].base_stat;
    poke__basestats_1.appendChild(poke__stat_attack);
   
    const poke__stat_defense =  document.createElement("p");
    poke__stat_defense.textContent = pokemon.stats[2].stat.name.toUpperCase() + ": " + pokemon.stats[2].base_stat;
    poke__basestats_1.appendChild(poke__stat_defense);

    const poke__stat_speed =  document.createElement("p");
    poke__stat_speed.textContent = pokemon.stats[5].stat.name.toUpperCase() + ": " + pokemon.stats[5].base_stat;
    poke__basestats_2.appendChild(poke__stat_speed);

    const poke__stat_attack_special =  document.createElement("p");
    poke__stat_attack_special.textContent = pokemon.stats[4].stat.name.toUpperCase() + ": " + pokemon.stats[4].base_stat;
    poke__basestats_2.appendChild(poke__stat_attack_special);
   
    const poke__stat_defense_special =  document.createElement("p");
    poke__stat_defense_special.textContent = pokemon.stats[3].stat.name.toUpperCase() + ": " + pokemon.stats[3].base_stat;
    poke__basestats_2.appendChild(poke__stat_defense_special);
 }


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
