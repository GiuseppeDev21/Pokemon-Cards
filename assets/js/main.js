const preferedColorScheme = window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
const toggle = document.querySelectorAll(".toggle-input");
const menuBtn = document.querySelector(".menu-btn");
const dropdownMenu = document.querySelector(".dropdown-menu");
const searchInput = document.querySelector("#search-input");
const searchInput2 = document.querySelector("#search-input2");
const searchBtn = document.querySelector("#search-btn");
const searchBtn2 = document.querySelector("#search-btn2");
const cardContainer = document.querySelector("#cards-container");
const randomPokemon = document.querySelector("#btn-random");
const randomPokemon2 = document.querySelector("#btn-randomn2");
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
let slideIndex,menuOpen = false,positionPoke = 1;

const switchTheme = () => {
  let switchToTheme =
    localStorage.getItem("theme") === "dark" ? "light" : "dark";
  setTheme(switchToTheme);
};

const setTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
};

setTheme(localStorage.getItem("theme") || preferedColorScheme);
toggle.forEach((checkbox) => {
  checkbox.addEventListener("change", switchTheme);
  checkbox.checked = localStorage.getItem("theme") === "light" ? true : false;
});

menuBtn.addEventListener("click", () => {
  if (!menuOpen) {
    menuBtn.classList.add("open");
    dropdownMenu.classList.add("open");
    menuOpen = true;
  } else {
    menuBtn.classList.remove("open");
    dropdownMenu.classList.remove("open");
    menuOpen = false;
  }
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let id = searchInput.value.toLowerCase();
  searchInput.value = searchInput.defaultValue;
  stats(id).catch((error) => {
    const Toast = Swal.mixin({
      toast: false,
      position: "center",
      iconColor: 'white',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      customClass: {
        popup: 'colored-toast'
      },
    });

    Toast.fire({
      icon: 'error',
      title: 'Pokemón Data not found'
    })
  });
});

searchBtn2.addEventListener("click", (e) => {
  e.preventDefault();
  let id = searchInput2.value.toLowerCase();
  searchInput2.value = searchInput2.defaultValue;
  stats(id).catch((error) => {
    const Toast = Swal.mixin({
      toast: false,
      position: "center",
      iconColor: 'white',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      customClass: {
        popup: 'colored-toast'
      },
    });

    Toast.fire({
      icon: 'error',
      title: 'Pokemón Data not found'
    })
  });
});

randomPokemon.addEventListener("click", () => {
  randomPokemon.setAttribute("disabled", "");
  setTimeout(() => {
    randomPokemon.removeAttribute("disabled", "");
  }, 1000);
  random();
});

randomPokemon2.addEventListener("click", () => {
  randomPokemon2.setAttribute("disabled", "");
  setTimeout(() => {
    randomPokemon2.removeAttribute("disabled", "");
  }, 1000);
  random();
});

const random = () => {
  const ranges = [
    { name: "pokedex", min: 1, max: 898 },
    { name: "other-form", min: 10001, max: 10032 },
    { name: "mega-form", min: 10033, max: 10090 },
    { name: "alola-form", min: 10099, max: 10015 },
    { name: "gmax-form", min: 10195, max: 10228 },
    { name: "hisui-form", min: 10229, max: 10246 },
  ];
  const rangeSelected = Math.floor(Math.random() * ranges.length);
  const range =
    Math.floor(
      Math.random() *
        (ranges[rangeSelected].max - ranges[rangeSelected].min + 1)
    ) + ranges[rangeSelected].min;
  stats(range);
};

const stats = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
  const rest = await fetch(url);
  const response = await rest.json();
  const statsInfo = {
    id: response.id,
    name: response.name,
    pokemon_species_url: response.species["url"],
    abilities: response.abilities.map(
      (ability) =>
        ability.ability.name.charAt(0).toUpperCase() +
        ability.ability.name.slice(1)
    ),
    type: response.types.map((type) => type.type.name),
    stats: response.stats,
    height: response.height,
    weight: response.weight,
    backImage: response.sprites["back_default"],
    frontImage: response.sprites.other.home["front_default"],
  };
  description(statsInfo);
};

const description = async (statsInfo) => {
  const url = `${statsInfo.pokemon_species_url}`;
  const rest = await fetch(url);
  const response = await rest.json();
  const descriptionInfo = {
    description: response.flavor_text_entries.find((descri) =>descri.language["name"] === "en" && descri.flavor_text.length < 153)["flavor_text"].replace("", " "),
    category: response.genera[7]["genus"],
    generation_url: response.generation["url"],
    evolution_chain_url: response.evolution_chain["url"],
    habitat_name : "This pokemon doesn't live in any place.",
    habitat_species: 0,
  };

  const generation = async () => {
    const url = `${descriptionInfo.generation_url}`;
    const rest = await fetch(url);
    const response = await rest.json();
    descriptionInfo.main_region = response.main_region['name'],
    descriptionInfo.generation_name = response.name
  }

  if (response.habitat !== null) {
    const habitat = async () => {
      const url = `${response.habitat.url}`;
      const rest = await fetch(url);
      const responseHabitat = await rest.json();
  
      descriptionInfo.habitat_name = responseHabitat.name,
      descriptionInfo.habitat_species = responseHabitat.pokemon_species.length;
    }
    habitat();
  }

  generation();
  evolutionChain(statsInfo, descriptionInfo);
};

const evolutionChain = async (statsInfo, descriptionInfo) => {
  const url = `${descriptionInfo.evolution_chain_url}`;
  const rest = await fetch(url);
  const response = await rest.json();

  let evolution_chain = [];

  const firstPokemonUrl = `${response.chain.species.url}`;
  const firstPokemonRest = await fetch(firstPokemonUrl);
  const firstPokemonResponse = await firstPokemonRest.json();
  evolution_chain.push({
    name:
      firstPokemonResponse.name.charAt(0).toUpperCase() +
      firstPokemonResponse.name.slice(1),
    id: firstPokemonResponse.id,
  });

  if (response.chain.evolves_to[0] !== undefined) {
    const secondPokemonUrl = `${response.chain.evolves_to[0].species.url}`;
    const secondPokemonRest = await fetch(secondPokemonUrl);
    const secondPokemonResponse = await secondPokemonRest.json();
    evolution_chain.push({
      name:
        secondPokemonResponse.name.charAt(0).toUpperCase() +
        secondPokemonResponse.name.slice(1),
      id: secondPokemonResponse.id,
    });

    if (response.chain.evolves_to[0].evolves_to[0] !== undefined) {
      const thirdPokemonUrl = `${response.chain.evolves_to[0].evolves_to[0].species.url}`;
      const thirdPokemonRest = await fetch(thirdPokemonUrl);
      const thirdPokemonResponse = await thirdPokemonRest.json();
      evolution_chain.push({
        name:
          thirdPokemonResponse.name.charAt(0).toUpperCase() +
          thirdPokemonResponse.name.slice(1),
        id: thirdPokemonResponse.id,
      });
    }
  }
  const evolutionInfo = { evolution_chain: evolution_chain };
  createCard(statsInfo, descriptionInfo, evolutionInfo);
};

const createCard = (statsInfo, descriptionInfo, evolutionInfo) => {
  const image = `<img class ="pokeImage" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${statsInfo.id}.png" alt="${statsInfo.name} Image" srcset="">`;
  const pokeContainer = document.createElement("div");
  pokeContainer.classList.add("card", "fade");
  pokeContainer.style.backgroundColor = `${
    typeColors[statsInfo.type[0]]
  }`;

  const icon = () => {
    const icon1 = `<div class="icon1 ${statsInfo.type[0]}"><img src="resources/icons/${statsInfo.type[0]}.svg" alt="" srcset=""></div>`;
    const icon2 = `<div class="icon2 ${statsInfo.type[1]}"><img src="resources/icons/${statsInfo.type[1]}.svg" alt="" srcset=""></div>`;
    if (statsInfo.type[1] !== undefined) {
      return icon1 + icon2;
    }
    return icon1;
  };

  const type = () => {
    const type1 = `<div class="type ${statsInfo.type[0]}">
                      <img src="resources/icons/${statsInfo.type[0]}.svg" alt="" srcset="">
                      <p>${statsInfo.type[0]}</p>
                    </div>`;
    const type2 = `<div class="type2 ${statsInfo.type[1]}">
                      <img src="resources/icons/${statsInfo.type[1]}.svg" alt="" srcset="">
                      <p>${statsInfo.type[1]}</p>
                    </div>`;
    if (statsInfo.type[1] !== undefined) {
      return type1 + type2;
    }
    return type1;
  };

  const title = `<p class="title">${statsInfo.name}</p>`;
  const sliderNav = `<div class="slider-nav">
                        <ul class="pokemonNav">
                          <li><p class="position-${positionPoke}" onclick="showSlide(1, ${positionPoke})">About</p></li>
                          <li><p class="position-${positionPoke}" onclick="showSlide(2, ${positionPoke})">Stats</p></li>
                          <li><p class="position-${positionPoke}" onclick="showSlide(3, ${positionPoke})">Evolution</p></li>
                          <li><p class="position-${positionPoke}" onclick="showSlide(4, ${positionPoke})">Habitat</p></li>
                        </ul>
                      </div>`;
  const slide1 = `<div id="slide-1" class="mySlides-${positionPoke} fade">
                      <div class="about-spec">
                        <p>${descriptionInfo.description}</p>
                      </div>
                      <div class="about-info">
                        <ul>
                            <li>Category: ${descriptionInfo.category}</li>
                            <li>Height: ${statsInfo.height} ft</li>
                            <li>Weight: ${statsInfo.weight} kg</li>
                            <li>Abilities: ${statsInfo.abilities.join(
                              ", "
                            )}</li>
                        </ul>
                      </div>
                      ${type()}
                    </div>`;
  const slide2 = `<div id="slide-2" class="mySlides-${positionPoke} fade">
                      <div class="stats-text">
                        <span class="stats-text__text">Hp</span>
                        <span class="stats-text__text">Attack</span>
                        <span class="stats-text__text">Defense</span>
                        <span class="stats-text__text">Sp. Attack</span>
                        <span class="stats-text__text">Sp. Defense</span>
                        <span class="stats-text__text">Speed</span>
                      </div>
                      <div class="stats-progress">
                        <div class="stats-progress__bar ${statsInfo.type[0]}" style="width:${statsInfo.stats[0].base_stat}px"></div>              
                        <div class="stats-progress__bar ${statsInfo.type[0]}" style="width:${statsInfo.stats[1].base_stat}px"></div>               
                        <div class="stats-progress__bar ${statsInfo.type[0]}" style="width:${statsInfo.stats[2].base_stat}px"></div>                
                        <div class="stats-progress__bar ${statsInfo.type[0]}" style="width:${statsInfo.stats[3].base_stat}px"></div>                
                        <div class="stats-progress__bar ${statsInfo.type[0]}" style="width:${statsInfo.stats[4].base_stat}px"></div>                
                        <div class="stats-progress__bar ${statsInfo.type[0]}" style="width:${statsInfo.stats[5].base_stat}px"></div>
                      </div>
                      <div class="stats-number">
                        <span class="stats-number__text">${statsInfo.stats[0].base_stat}</span>
                        <span class="stats-number__text">${statsInfo.stats[1].base_stat}</span>
                        <span class="stats-number__text">${statsInfo.stats[2].base_stat}</span>
                        <span class="stats-number__text">${statsInfo.stats[3].base_stat}</span>
                        <span class="stats-number__text">${statsInfo.stats[4].base_stat}</span>
                        <span class="stats-number__text">${statsInfo.stats[5].base_stat}</span>
                      </div>
                    </div>`;
  const slide3 = () => {
    let slide3Content = "";
    evolutionInfo["evolution_chain"].forEach((evolution) => {
      let slide3Box = `<div class="evolution-card">
                          <div class="evolution-card__background">
                            <img class="evolution-card__image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.id}.png"; alt="${evolution.name} Image" >
                          </div>
                          <p class="evolution-card__name">${evolution.name}</p>
                          <p class="evolution-card__id">#${evolution.id}</p>
                        </div>`;
      slide3Content += slide3Box;
    });
    let slide3Container = `<div id="slide-3" class="mySlides-${positionPoke} fade"><div class="evolution-box">${slide3Content}</div></div>`;
    return slide3Container;
  };

  const slide4 = `<div id="slide-4" class="mySlides-${positionPoke} fade">
                    <div class="habitat-container">
                      <ul>
                          <li>Generation: ${descriptionInfo.generation_name}</li>
                          <li>Main Region: ${descriptionInfo.main_region}</li>
                          <li>Habitat: ${descriptionInfo.habitat_name}</li>
                          <li>${descriptionInfo.habitat_species} Pokemon Species live in this habitat.</li>
                      </ul>
                    </div>
                  </div>`;

  const pokeCard = `${icon() + title + image}
      <section class="container">
        ${sliderNav}
        <div class="slider-wrapper">
          <div class="slider">
              ${slide1 + slide2 + slide3() + slide4}
          </div> 
        </div>
      </section>`;
  pokeContainer.innerHTML = pokeCard;
  cardContainer.insertAdjacentElement("afterbegin", pokeContainer);
  showSlide(1, positionPoke);
  positionPoke += 1;
};

const showSlide = (n, position) => {
  let slides = document.getElementsByClassName(`mySlides-${position}`);
  let slidePosition = document.getElementsByClassName(`position-${position}`);
  let i;
  slideIndex = n;

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < slidePosition.length; i++) {
    slidePosition[i].className = slidePosition[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  slidePosition[slideIndex - 1].className += " active";
};