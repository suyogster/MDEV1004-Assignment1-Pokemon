/**
 * Filename: script.js
 * Student Name: [Your Name]
 * Student ID: [Your Student ID]
 * Date: [Date]
 */

const pokemonURL = 'https://pokeapi.co/api/v2/pokemon?limit=5';

let currentURL = '';

document.addEventListener('DOMContentLoaded', function () {
  function setCurrentUrlBox(url) {
    const urlBox = document.getElementById('url-box');
    urlBox.textContent = url;
  }

  // fetching pokemon data
  function fetchAllPokemon() {
    setCurrentUrlBox(pokemonURL);
    fetch(pokemonURL)
      .then((response) => response.json())
      .then((data) => {
        const listOfPokemon = data.results;

        // adding item to pokemon list
        addPokemonItem(listOfPokemon);
      });
  }

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
    const specsDetailSection = document.getElementById('specs-details');
    const abilitiesDetailSection = document.getElementById('abilities-details');
    specsDetailSection.style.display = 'none';
    abilitiesDetailSection.style.display = 'none';

    data.forEach((item) => {
      // creating div and text element for pokemon item
      const pokemonItem = document.createElement('div');
      const pokemonName = document.createElement('p');
      pokemonName.classList.add('pokemon-name');

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
    setCurrentUrlBox(data.url);
    const pokemon = await getPokemonInfo(data.url);
    const specsDetails = document.getElementById('specs-details');

    while (specsDetails.firstChild) {
      specsDetails.removeChild(specsDetails.firstChild);
    }
    specsDetails.style.display = 'block';

    const name = document.createElement('p');
    name.innerHTML = `<b>Name:</b> ${pokemon.name}`;
    specsDetails.appendChild(name);

    const height = document.createElement('p');
    height.innerHTML = `<b>Height:</b> ${pokemon.height}`;
    specsDetails.appendChild(height);

    const baseExperience = document.createElement('p');
    baseExperience.innerHTML = `<b>Base Experience:</b> ${pokemon.base_experience}`;
    specsDetails.appendChild(baseExperience);

    const abilities = document.createElement('p');
    abilities.innerHTML = `<b>Abilities:</b>`;
    specsDetails.appendChild(abilities);

    pokemon.abilities.forEach(async (ability) => {
      const abilityData = await getPokemonInfo(ability.ability.url);
      const abilityElement = document.createElement('div');
      abilityElement.classList.add('ability');
      abilityElement.innerHTML = 'Abilities: ';
      abilityElement.innerHTML = `
        <p>${ability.ability.name}, </p>
    `;
      abilityElement.classList.add('abilities-text');
      abilityElement.addEventListener('click', () =>
        showAbilityDetails(abilityData, ability.ability.url)
      );
      specsDetails.appendChild(abilityElement);
    });
  }

  // Function to show detailed ability information
  function showAbilityDetails(ability, url) {
    setCurrentUrlBox(url);
    const abilitiesDetail = document.getElementById('abilities-details');
    abilitiesDetail.style.display = 'block';
    while (abilitiesDetail.firstChild) {
      abilitiesDetail.removeChild(abilitiesDetail.firstChild);
    }

    const abilityDetails = document.createElement('div');
    abilityDetails.classList.add('ability-details');
    abilityDetails.innerHTML = `
        <h4>Ability Name: ${ability.name}</h4>
        <p>Ability Effect: ${
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
    abilitiesDetail.appendChild(abilityDetails);
  }

  fetchAllPokemon();
});
