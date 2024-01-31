const pokemonURL = "https://pokeapi.co/api/v2/pokemon?limit=5";

document.addEventListener("DOMContentLoaded", () => {

    // fetching pokemon data
    const getPokemonData = () => {
        fetch(pokemonURL)
            .then(response => response.json())
            .then(data => {
                const listOfPokemon = data.results;

                // adding item to pokemon list
                addPokemonItem(listOfPokemon);
            });
    };

    function addPokemonItem(data) {
        const pokemonListElement = document.getElementById("pokemonListElement");

        data.forEach(item => {
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
            pokemonItem.appendChild(pokemonName);
            pokemonListElement.appendChild(pokemonItem);
        });
    }
    
    getPokemonData();
});