let pokemonContainer = document.querySelector('#pokemon-container');
console.log(pokemonContainer); 

const starterPokemon = {
  id: 25,
  name: "pikachu",
  sprites: {
    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
  }
};

function renderPokemon(pokemon) {
  let card = document.createElement('div'); 
  let name = document.createElement('h2'); 
  name.textContent = pokemon.name; 

  card.appendChild(name); 

  let image = document.createElement('img'); 
  image.src = pokemon.sprites.front_default; 
  image.alt = pokemon.name; 

  card.appendChild(image);




  pokemonContainer.appendChild(card); 
}

// renderPokemon(starterPokemon);

async function fetchPokemon(id) {
  try {
   let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

   if(!response.ok) {
    throw new Error('Unable to fetch pokemon')
   }


   let data = await response.json()
   renderPokemon(data); 


  } catch(err) {
    console.log(err)
  }


}

fetchPokemon(22);

async function displayMultiplePokemon(ids) {
  try {
    for(let id of ids) {
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
     if(!response.ok) {
    throw new Error('Unable to fetch pokemon')
   }


   let data = await response.json()
   renderPokemon(data); 
    }

  } catch(err) {
    console.log(err)
  }

}

displayMultiplePokemon([1, 4, 7, 25])

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


