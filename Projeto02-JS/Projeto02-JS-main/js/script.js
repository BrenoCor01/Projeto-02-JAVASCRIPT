const pokemonNome = document.querySelector(".pokemon-nome");
const pokemonNum = document.querySelector(".pokemon-num");
const pokemonImg = document.querySelector(".pokemon-img");
const form = document.querySelector(".form");
const input = document.querySelector(".input-busca");
const prev = document.querySelector(".btn-prev");
const next = document.querySelector(".btn-next");

let buscarPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonNome.innerHTML = "Loading...";
  pokemonNum.innerHTML = "";

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImg.style.display = "block";
    pokemonNome.innerHTML = data.name;
    pokemonNum.innerHTML = data.id;
    pokemonImg.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];

    input.value = "";
    buscarPokemon = data.id;
  } else {
    pokemonImg.style.display = "none";
    pokemonNome.innerHTML = "Not found :C";
    pokemonNum.innerHTML = "";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  renderPokemon(input.value.toLowerCase());
});

prev.addEventListener("click", () => {
  if (buscarPokemon > 1) {
    buscarPokemon -= 1;
    renderPokemon(buscarPokemon);
  }
});

next.addEventListener("click", () => {
  buscarPokemon += 1;
  renderPokemon(buscarPokemon);
});

renderPokemon(buscarPokemon);
