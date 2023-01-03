const preferedColorScheme = window.matchMedia("(prefers-color-scheme: dark)")
  .matches
  ? "dark"
  : "light";
const toggle = document.querySelector(".toggle-input");
toggle.checked = localStorage.getItem("theme") === "light" ? true : false;

const setTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
};

toggle.addEventListener("change", function () {
  let switchToTheme =
    localStorage.getItem("theme") === "dark" ? "light" : "dark";
  setTheme(switchToTheme);
});

setTheme(localStorage.getItem("theme") || preferedColorScheme);

//

const input = document.querySelector("#name");
const search = document.querySelector("#search");
let pokemon;
let pokemonArray = [];

search.addEventListener("click", (e) => {
  e.preventDefault();
  pokemon = input.value.toLowerCase();
  input.value = "";
  pokemonArray = [];
  stats();
});

// *Generation: generation
// *Evolution-Chain: evolution chain
// *Pokemon: height: Name, id, weight, abilities, hp, attack, defense, sp_attack, sp_defense, sprite
// *Species Pokemon: description "flavor-text", habitat, category "genra"


const stats = async () => {
  let pokemonInfo = [];
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;
  let response = await fetch(url);
  let commits = await response.json();
  pokemonInfo.push(commits);

  const firstPokemonInfo = pokemonInfo.map(pokemon => ({
    pokemon_id: pokemon.id,
    name: pokemon.name,
    pokemon_species_url: pokemon.species['url'],
    abilities: pokemon.abilities.map(ability => ability.ability.name),
    type: pokemon.types.map(type => type.type.name),
    stats: pokemon.stats,
    height: pokemon.height,
    weight: pokemon.weight,
    backImage: pokemon.sprites['back_default'],
    frontImage: pokemon.sprites['front_default'],
  }))
  
  pokemonArray = [].concat(pokemonArray,firstPokemonInfo);
  SpeciesPokemon();
}

const SpeciesPokemon = async () => {
  // *Species Pokemon: description "flavor-text", habitat, category "genra"
  let pokemonInfo = [];
  let url = pokemonArray[0].pokemon_species_url;
  let response = await fetch(url);
  let commits = await response.json();
  pokemonInfo.push(commits);
  const secondPokemonInfo = pokemonInfo.map(pokemon => ({
    description: pokemon.flavor_text_entries[14]['flavor_text'],
    habitat : pokemon.habitat,    
    category: pokemon.genera[7]['genus'],
    generation: pokemon.generation['name'],
    generation_url: pokemon.generation['url']
  }))
  pokemonArray = [].concat(pokemonArray,secondPokemonInfo);
  console.log(pokemonArray);
  //generation();
}


const generation = async () => {
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
}

const evolutionChain = async () => {
  console.log(true);
};

/* 
  1- TODO: Clean the function code to be more effective // !After all works
  2- TODO: Fusion the arrays to make only one object
  3- FIXME: Create a function to filter flavor_text_entries to get the english description
  }*/
