const pokemonURL = "https://pokeapi.co/api/v2/pokemon?limit=5";

document.addEventListener("DOMContentLoaded", () => {
    const getPokemonData = () => {
        // fetching pokemon data
        fetch(pokemonURL)
            .then(response => response.json())
            .then(data => {
                const listOfPokemon = data.results;
                addPokemonItem(listOfPokemon);
            });
    };

    function addPokemonItem(data) {
        const pokemonListElement = document.getElementById("pokemonListElement");

        // displaying pokemon image and name for each item
        data.forEach(item => {
            const pokemonItem = document.createElement('div');
            const pokemonName = document.createElement('p');
            const pokemonID = item.url.split('/')[6];
            pokemonItem.className = 'pokemon-item';
            pokemonItem.innerHTML = `
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonID}.png" alt="${item.name}" class="pokemon-image">`;
            pokemonName.textContent = item.name;
            pokemonItem.appendChild(pokemonName);
            pokemonListElement.appendChild(pokemonItem);
        });
    }
    
    getPokemonData();
});