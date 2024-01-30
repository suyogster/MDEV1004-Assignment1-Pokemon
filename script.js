const baseURL = "https://pokeapi.co/api/v2/pokemon";

fetch(baseURL)
    .then((response) => response.json())
    .then((data) => {
        console.log("pokemon data: ", data)
    })
    .catch((error) => console.error("error: ", error))