const preferedColorScheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
const toggle = document.querySelector(".toggle-input");
toggle.checked = localStorage.getItem("theme") === "light" ? true : false;

const setTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
};

toggle.addEventListener("change", function () {
  let switchToTheme = localStorage.getItem("theme") === "dark" ? "light" : "dark";
  setTheme(switchToTheme);
});

setTheme(localStorage.getItem("theme") || preferedColorScheme);

const input = document.querySelector("#name");
const search = document.querySelector("#search");
const card = document.querySelector("#cards");
// const megaPokemon = document.querySelector("#btn-mega");
const randomPokemon = document.querySelector("#btn-random");
let slideIndex;
let positionPoke = 1;
//let pokemonGeneration = [1, 890];

const typeColors = {
  bug: "#E0EFBD",
  dark: "#D5D4D8",
  dragon: "#C5E0FC",
  electric: "#F9EFB3",
  fairy: "#F7CAF3",
  fighting: "#F3CED5",
  fire: "#FFA385",
  flying: "#BBCEF1",
  ghost: "#C5CAE7",
  grass: "#9BE9A4",
  ground: "#F1CDBB",
  ice: "#C2EAE4",
  normal: "#DCDCDC",
  poison: "#EAD0F1",
  psychic: "#fed9d8",
  rock: "#E5DFC7",
  steel: "#CADEE3",
  water: "#cbe2f6",
};

search.addEventListener("click", (e) => {
  e.preventDefault();
  let id = input.value.toLowerCase();
  input.value = "";
  pokemonStats = [];
  stats(id);
});

// megaPokemon.addEventListener("click", () => {
//   id = Math.floor(Math.random() * (10090 - 10033) + 10033 );
//   pokemonStats = [];
//   stats();
// });

randomPokemon.addEventListener("click", () => {
  randomPokemon.setAttribute('disabled', '');
  setTimeout(() => {randomPokemon.removeAttribute('disabled', '')}, 2000);
  stats((Math.floor(Math.random() * (898 - 1) + 1)));
});

const stats = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
  const rest = await fetch(url);
  const response = await rest.json();
  const firstPokemonInfo = {
    id: response.id,
    name: response.name.charAt(0).toUpperCase() + response.name.slice(1),
    pokemon_species_url: response.species["url"],
    abilities: response.abilities.map((ability) => ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1) ),
    type: response.types.map((type) => type.type.name),
    stats: response.stats,
    height: response.height,
    weight: response.weight,
    backImage: response.sprites["back_default"],
    frontImage: response.sprites.other.home["front_default"],
  };
  description(firstPokemonInfo);
};

const description = async (firstPokemonInfo) => {
  const url = `${firstPokemonInfo.pokemon_species_url}`;
  const rest = await fetch(url);
  const response = await rest.json();
  const secondPokemonInfo = {
    description: response.flavor_text_entries.find( (descri) => descri.language["name"] === "en" && descri.flavor_text.length < 153 )["flavor_text"].replace("", " "),
    habitat: response.habitat,
    category: response.genera[7]["genus"],
    generation: response.generation["name"],
    generation_url: response.generation["url"],
    evolution_chain_url: response.evolution_chain["url"],
  };
  evolutionChain(firstPokemonInfo, secondPokemonInfo);
};

const evolutionChain = async (firstPokemonInfo, secondPokemonInfo) => {
  const url = `${secondPokemonInfo.evolution_chain_url}`;
  const rest = await fetch(url);
  const response =  await rest.json();

  let evolution_chain = [];

  const firstPokemonUrl = `${response.chain.species.url}`;
  const firstPokemonRest = await fetch(firstPokemonUrl)
  const firstPokemonResponse = await firstPokemonRest.json();  
  evolution_chain.push({
    name: firstPokemonResponse.name.charAt(0).toUpperCase() + firstPokemonResponse.name.slice(1),
    id: firstPokemonResponse.id,
  });

  if (response.chain.evolves_to[0] !== undefined) {
    const secondPokemonUrl = `${response.chain.evolves_to[0].species.url}`;
    const secondPokemonRest = await fetch(secondPokemonUrl);
    const secondPokemonResponse = await secondPokemonRest.json();
    evolution_chain.push({
      name: secondPokemonResponse.name.charAt(0).toUpperCase() + secondPokemonResponse.name.slice(1),
      id: secondPokemonResponse.id,
    });

    if (response.chain.evolves_to[0].evolves_to[0] !== undefined) {
      const thirdPokemonUrl = `${response.chain.evolves_to[0].evolves_to[0].species.url}`;
      const thirdPokemonRest = await fetch(thirdPokemonUrl);
      const thirdPokemonResponse = await thirdPokemonRest.json();
      evolution_chain.push({
        name: thirdPokemonResponse.name.charAt(0).toUpperCase() + thirdPokemonResponse.name.slice(1),
        id: thirdPokemonResponse.id,
      });
    }
  }
  const thirdPokemonInfo = {evolution_chain: evolution_chain};
  createCard(firstPokemonInfo, secondPokemonInfo, thirdPokemonInfo);
};

const createCard = (firstPokemonInfo, secondPokemonInfo, thirdPokemonInfo) => {
  const image = `<img class ="pokeImage" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${firstPokemonInfo.id}.png" alt="${firstPokemonInfo.name} Image" srcset="">`;
  const pokeContainer = document.createElement("div");
  pokeContainer.classList.add("cards-container", "fade");
  pokeContainer.style.backgroundColor = `${typeColors[firstPokemonInfo.type[0]]}`;

  const icon = () => {
    const icon1 = `<div class="icon1 ${firstPokemonInfo.type[0]}"><img src="resources/images/icons/${firstPokemonInfo.type[0]}.svg" alt="" srcset=""></div>`; 
    const icon2 = `<div class="icon2 ${firstPokemonInfo.type[1]}"><img src="resources/images/icons/${firstPokemonInfo.type[1]}.svg" alt="" srcset=""></div>`;  
    if(firstPokemonInfo.type[1] !== undefined){return icon1 + icon2;}
    return icon1;
  } 

  const type = () => {
    const type1 = `<div class="type ${firstPokemonInfo.type[0]}">
                    <img src="resources/images/icons/${firstPokemonInfo.type[0]}.svg" alt="" srcset="">
                    <p>${firstPokemonInfo.type[0]}</p>
                  </div>`;
    const type2 = `<div class="type2 ${firstPokemonInfo.type[1]}">
                    <img src="resources/images/icons/${firstPokemonInfo.type[1]}.svg" alt="" srcset="">
                    <p>${firstPokemonInfo.type[1]}</p>
                  </div>`
    if(firstPokemonInfo.type[1] !== undefined){return type1 + type2}
    return type1;
  }

  const title = `<p class="title">#${firstPokemonInfo.id} ${firstPokemonInfo.name}</p>`;
  // const image = `<img class ="pokeImage" src="${pokemon.frontImage}" alt="Pokemon Image" srcset="">`;
  // const image = `<img class ="pokeImage" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemon.id}.png" alt="${pokemon.name} Image" srcset="">`;
  // const image = `<img class ="pokeImage" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg" alt="Pokemon Image" srcset="">`;
  const sliderNav = `<div class="slider-nav">
                      <ul class="pokemonNav">
                        <li><p class="dot-${positionPoke}" onclick="showSlide(1, ${positionPoke})">About</p></li>
                        <li><p class="dot-${positionPoke}" onclick="showSlide(2, ${positionPoke})">Stats</p></li>
                        <li><p class="dot-${positionPoke}" onclick="showSlide(3, ${positionPoke})">Evolution</p></li>
                        <li><p class="dot-${positionPoke}" onclick="showSlide(4, ${positionPoke})">Habitat</p></li>
                      </ul>
                    </div>`;
  const slide1 = `<div id="slide-1" class="mySlides-${positionPoke} fade">
                    <div class="spec">
                      <p>${secondPokemonInfo.description}</p>
                    </div>
                    <div class="info">
                      <ul>
                          <li>Category: ${secondPokemonInfo.category}</li>
                          <li>Height: ${firstPokemonInfo.height} ft</li>
                          <li>Weight: ${firstPokemonInfo.weight} kg</li>
                          <li>Abilities: ${firstPokemonInfo.abilities.join(", ")}</li>
                      </ul>
                    </div>
                    ${type()}
                  </div>`;
  const slide2 = `<div id="slide-2" class="mySlides-${positionPoke} fade">
                    <div class="texto">
                      <span class="stats-text">Hp</span>
                      <span class="stats-text">Attack</span>
                      <span class="stats-text">Defense</span>
                      <span class="stats-text">Sp. Attack</span>
                      <span class="stats-text">Sp. Defense</span>
                      <span class="stats-text">Speed</span>
                    </div>
                    <div class="progress">
                      <div class="progress-bar ${firstPokemonInfo.type[0]}" style="width:${firstPokemonInfo.stats[0].base_stat}px"></div>              
                      <div class="progress-bar ${firstPokemonInfo.type[0]}" style="width:${firstPokemonInfo.stats[1].base_stat}px"></div>               
                      <div class="progress-bar ${firstPokemonInfo.type[0]}" style="width:${firstPokemonInfo.stats[2].base_stat}px"></div>                
                      <div class="progress-bar ${firstPokemonInfo.type[0]}" style="width:${firstPokemonInfo.stats[3].base_stat}px"></div>                
                      <div class="progress-bar ${firstPokemonInfo.type[0]}" style="width:${firstPokemonInfo.stats[4].base_stat}px"></div>                
                      <div class="progress-bar ${firstPokemonInfo.type[0]}" style="width:${firstPokemonInfo.stats[5].base_stat}px"></div>
                    </div>
                    <div class="niveles">
                      <span class="niveles-text">${firstPokemonInfo.stats[0].base_stat}</span>
                      <span class="niveles-text">${firstPokemonInfo.stats[1].base_stat}</span>
                      <span class="niveles-text">${firstPokemonInfo.stats[2].base_stat}</span>
                      <span class="niveles-text">${firstPokemonInfo.stats[3].base_stat}</span>
                      <span class="niveles-text">${firstPokemonInfo.stats[4].base_stat}</span>
                      <span class="niveles-text">${firstPokemonInfo.stats[5].base_stat}</span>
                    </div>
                  </div>`;
  const slide3 = () => {
    let slide3Content = "";
    thirdPokemonInfo["evolution_chain"].forEach((evolution) => {
      let slide3Box = `<div class="evolution_card">
                        <div class="evolution_card__background">
                          <img class="evolution_card__image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.id}.png" onclick = stats(${evolution.id}); alt="" >
                        </div>
                        <p class="evolution_card__name">${evolution.name}</p>
                        <p class="evolution_card__id">#${evolution.id}</p>
                      </div>`;
      slide3Content += slide3Box;
    });
    let slide3Container = `<div id="slide-3" class="mySlides-${positionPoke} fade"><div class="evolution_box">${slide3Content}</div></div>`;
    return slide3Container;
  }

  const pokeCard = `${icon() + title + image}
    <section class="container">
      ${sliderNav}
      <div class="slider-wrapper">
        <div class="slider">
            ${slide1 + slide2 + slide3()}
            <div id="slide-4" class="mySlides-${positionPoke} fade"></div>
        </div> 
      </div>
    </section>`;
  pokeContainer.innerHTML = pokeCard;
  card.appendChild(pokeContainer);
  showSlide(1, positionPoke);
  positionPoke += 1;
};
/*const generation = async () => {
  let pokemonInfo = [];
  let url = pokemonArray[1].generation_url;
  let response = await fetch(url);
  let commits = await response.json();
  pokemonInfo.push(commits);

  const thirdPokemonInfo = pokemonInfo.map(pokemon => ({
    main_region: pokemon.main_region['name'],
  }));

  pokemonArray = [].concat(pokemonArray,thirdPokemonInfo);
  console.log(pokemonArray);

  evolutionChain();
}*/

const showSlide = (n, position) => {
  let slides = document.getElementsByClassName(`mySlides-${position}`);
  let dots = document.getElementsByClassName(`dot-${position}`);
  let i;
  slideIndex = n; 
 
  for (i = 0; i < slides.length; i++) {slides[i].style.display = "none";}
  for (i = 0; i < dots.length; i++) {dots[i].className = dots[i].className.replace(" active", "");}
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
};

// * Generate Cards with a range
// const rango = async () => {
//   for (let i = pokemonGeneration[0]; i <= pokemonGeneration[1]; i++){  
//     await stats(i);
//   }
// }
// rango();

// *  Scroll
// var amount = 0;
// document.addEventListener("wheel", function(ev) {
//   window.scroll({
//     top: 710,
//     behavior:'smooth'
//   })
//   amount += ev.deltaY ;
//   // ev.preventDefault();
//   console.log(amount);
// });

// mega 10033 - 10090
// alola 10099 - 10115
// gmax 10195 - 10228
// hisui 10229, 10246