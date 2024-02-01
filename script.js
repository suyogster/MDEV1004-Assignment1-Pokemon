/**
 * Filename: script.js
 * Student Name: [Your Name]
 * Student ID: [Your Student ID]
 * Date: [Date]
 */

const pokemonURL = 'https://pokeapi.co/api/v2/pokemon?limit=5';

// fetching pokemon data
const getPokemonData = () => {
  fetch(pokemonURL)
    .then((response) => response.json())
    .then((data) => {
      const listOfPokemon = data.results;

      // adding item to pokemon list
      addPokemonItem(listOfPokemon);
    });
};

//fetching individual data of pokemon
async function getPokemonInfo(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function addPokemonItem(data) {
  const pokemonListElement = document.getElementById('pokemonListElement');

  data.forEach((item) => {
    // creating div and text element for pokemon item
    const pokemonItem = document.createElement('div');
    const pokemonName = document.createElement('p');

    const pokemonID = item.url.split('/')[6];
    pokemonItem.className = 'pokemon-item';

    // getting and setting pokemon image and name
    pokemonItem.innerHTML = `
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonID}.png" 
                    alt="${item.name}" class="pokemon-image">`;
    pokemonName.textContent = item.name;

    // appending pokemon items to pokemon list element
    pokemonItem.addEventListener('click', () => showPokemonDetails(item));
    pokemonItem.appendChild(pokemonName);
    pokemonListElement.appendChild(pokemonItem);
  });
}

// Function to show detailed Pokemon information
async function showPokemonDetails(data) {
  console.log(data);
  const pokemon = await getPokemonInfo(data.url);
  const pokemonDetails = document.getElementById('specs-details');
  pokemonDetails.innerHTML = `
        <p>${pokemon.name}</p>
        <p>Abilities: ${pokemon.abilities
          .map((ability) => ability.ability.name)
          .join(', ')}</p>
        <p>Height: ${pokemon.height}</p>
        <p>Base Experience: ${pokemon.base_experience}</p>
    `;
  pokemonDetails.innerHTML += '<h3>Abilities</h3>';
  pokemon.abilities.forEach(async (ability) => {
    const abilityData = await getPokemonInfo(ability.ability.url);

    abilityElement.addEventListener('click', () =>
      showAbilityDetails(abilityData)
    );
    pokemonDetails.appendChild(abilityElement);
  });
}

// Function to show detailed ability information
function showAbilityDetails(ability) {
  const pokemonDetails = document.getElementById('abilities-details');
  const abilityDetails = document.createElement('div');
  abilityDetails.classList.add('ability-details');
  abilityDetails.innerHTML = `
        <h4>${ability.name}</h4>
        <p>Effect: ${
          ability.effect_entries.find((entry) => entry.language.name === 'en')
            .effect
        }</p>
        <p>Short Effect: ${
          ability.effect_entries.find((entry) => entry.language.name === 'en')
            .short_effect
        }</p>
        <p>Flavor Text: ${
          ability.flavor_text_entries.find(
            (entry) => entry.language.name === 'en'
          ).flavor_text
        }</p>
    `;
  pokemonDetails.appendChild(abilityDetails);
}

window.onload = getPokemonData();
