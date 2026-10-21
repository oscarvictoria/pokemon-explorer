async function getPokemon() {
  try {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
    if (!response.ok) {
      throw new Error("Failed to fetch Pokemon");
    }

    let pokemon = await response.json();
    console.log("Name: " + pokemon.name);
    console.log("Height: " + pokemon.height);
    console.log("Weight: " + pokemon.weight);
  } catch (err) {
    console.log(err);
  }
}

// getPokemon();

function getPokemonWithPromises() {
  fetch("https://pokeapi.co/api/v2/pokemon/charmander")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Failed to fetch Pokemon");
      }

      return response.json();
    })
    .then(function (pokemon) {
      console.log("Name: " + pokemon.name);
      console.log("Height: " + pokemon.height);
      console.log("Weight: " + pokemon.weight);
    })
    .catch(function (err) {
      console.log(err);
    });
}

// getPokemonWithPromises();

const pokemonNames = ["bulbasaur", "fakepokemon", "squirtle"];

async function getStartedPokemon() {
  try {
    let pokemeonsArray = pokemonNames.map(function (pokemon) {
      return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    });

    let response = await Promise.all(pokemeonsArray);

    for (let result of response) {
      if (!result.ok) {
        throw new Error("Failed to fetch Pokemon");
      }
    }

    let pokemonDataPromises = response.map(function (pokemon) {
      return pokemon.json();
    });

    let pokemonData = await Promise.all(pokemonDataPromises);
    for (let pokemon of pokemonData) {
      console.log("Name: " + pokemon.name);
      console.log("Height: " + pokemon.height);
      console.log("Weight: " + pokemon.weight);
    }
  } catch (err) {
    console.log(err);
  }
}

getStartedPokemon();
