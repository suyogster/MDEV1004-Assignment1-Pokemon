/**
 * Filename: script.js
 * Student Name / Student ID:
 * Suyog Shrestha, 200565523
 * Puja Shrestha, 200573293
 * Date: Feb 1st, 2024
 */

const pokemonURL = 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=5';
let currentURL = '';

// Event listener for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
  /**
   * Sets the current URL in the UI
   * @param {string} url - The URL to be displayed
   */
  function setCurrentUrlBox(url) {
    const urlBox = document.getElementById('url-box');
    urlBox.textContent = url;
  }

  /**
   * @description - Fetches data of all Pokemon
   */
  function fetchAllPokemon() {
    setCurrentUrlBox(pokemonURL);
    fetch(pokemonURL)
      .then((response) => response.json())
      .then((data) => {
        const listOfPokemon = data.results;

        // Adding items to the Pokemon list
        addPokemonItem(listOfPokemon);
      });
  }

  /**
   * Fetches individual data of a Pokemon
   * @param {string} url - The URL of the Pokemon
   * @returns {Promise} - Resolves to the Pokemon data
   */
  async function getPokemonInfo(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  /**
   * Adds Pokemon items to the list
   * @param {Array} data - List of Pokemon data
   */
  function addPokemonItem(data) {
    const pokemonListElement = document.getElementById('pokemonListElement');
    const specsDetailSection = document.getElementById('specs-details');
    const abilitiesDetailSection = document.getElementById('abilities-details');
    specsDetailSection.style.display = 'none';
    abilitiesDetailSection.style.display = 'none';

    data.forEach((item) => {
      // Creating div and text element for each Pokemon item
      const pokemonItem = document.createElement('div');
      const pokemonName = document.createElement('p');
      pokemonName.classList.add('pokemon-name');

      const pokemonID = item.url.split('/')[6];
      pokemonItem.className = 'pokemon-item';

      // Setting Pokemon image and name
      pokemonItem.innerHTML = `
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonID}.png" 
            alt="${item.name}" class="pokemon-image">`;
      pokemonName.textContent = item.name;

      // Appending Pokemon items to the list
      pokemonItem.addEventListener('click', () => showPokemonDetails(item));
      pokemonItem.appendChild(pokemonName);
      pokemonListElement.appendChild(pokemonItem);
    });
  }

  /**
   * Shows detailed information about a Pokemon
   * @param {*} data - The Pokemon data
   */
  async function showPokemonDetails(data) {
    setCurrentUrlBox(data.url);
    const pokemon = await getPokemonInfo(data.url);
    const specsDetails = document.getElementById('specs-details');

    while (specsDetails.firstChild) {
      specsDetails.removeChild(specsDetails.firstChild);
    }
    specsDetails.style.display = 'block';

    // Displaying Pokemon details
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

    // Displaying Pokemon abilities
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

  /**
   * Shows detailed information about a Pokemon ability
   * @param {object} ability - The ability data
   * @param {string} url - The URL of the ability
   */
  function showAbilityDetails(ability, url) {
    setCurrentUrlBox(url);
    const abilitiesDetail = document.getElementById('abilities-details');
    abilitiesDetail.style.display = 'block';
    while (abilitiesDetail.firstChild) {
      abilitiesDetail.removeChild(abilitiesDetail.firstChild);
    }

    // Displaying ability details
    const abilityDetails = document.createElement('div');
    abilityDetails.classList.add('ability-details');
    abilityDetails.innerHTML = `
      <h4><b>Ability Name:</b> ${ability.name}</h4>
      <p><b>Ability Effect:</b> ${
        ability.effect_entries.find((entry) => entry.language.name === 'en')
          .effect
      }</p>
      <p><b>Short Effect:</b> ${
        ability.effect_entries.find((entry) => entry.language.name === 'en')
          .short_effect
      }</p>
      <p><b>Flavor Text:</b> ${
        ability.flavor_text_entries.find(
          (entry) => entry.language.name === 'en'
        ).flavor_text
      }</p>
    `;
    abilitiesDetail.appendChild(abilityDetails);
  }

  // Fetch data of all Pokemon when the page loads
  fetchAllPokemon();
});
