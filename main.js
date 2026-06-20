const POKEAPI_URL = "https://pokeapi.co/api/v2";
const pokemonList = document.getElementById("pokemons");
const pokemonImage = document.getElementById("pokemon-image");
const pokemonTypeText = document.getElementById("pokemon-type");

const loadPokemons = async () => {
    try {
        const response = await fetch(`${POKEAPI_URL}/pokemon`).then(response => response.json());
        response.results.forEach(pokemon => {
            const option = document.createElement("option");
            option.textContent = pokemon.name;
            option.value = pokemon.url;
            pokemonList.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching pokemons:", error);
    }
}

loadPokemons();

const pokemonSelected = async (pokemonUrl) => {
    try {
        const response = await fetch(pokemonUrl).then(response => response.json());

        const pokemonName = document.getElementById("pokemon-name");
        const pokemonStats = document.getElementById("pokemon-stats");
        const pokemonAbilities = document.getElementById("pokemon-abilities"); 

        pokemonImage.src = response.sprites.front_default;
        pokemonName.textContent = response.name;

        const types = response.types.map(element => element.type.name).join(", ");
        pokemonImage.dataset.types = types;
        pokemonTypeText.textContent = "";

        pokemonStats.innerHTML = "";
        pokemonAbilities.innerHTML = ""; 

        response.stats.forEach(stat => {
            const li = document.createElement("li");
            li.textContent = `${stat.stat.name}: ${stat.base_stat}`;
            pokemonStats.appendChild(li);
        });

        response.abilities.forEach(element => {
            const li = document.createElement("li");
            li.textContent = element.ability.name; 
            pokemonAbilities.appendChild(li);
        });

    } catch (error) {
        console.error("Error fetching pokemon details:", error);
    }
}

pokemonImage.addEventListener("mouseenter", () => {
    if (pokemonImage.dataset.types) {
        pokemonTypeText.textContent = `Tipo: ${pokemonImage.dataset.types}`;
    }
});

pokemonImage.addEventListener("mouseleave", () => {
    pokemonTypeText.textContent = "";
});


// fetch(`${POKEAPI_URL}/pokemon`)
// .then(response => response.json())
// .then(data => {
//     console.log(data);
// });

//types": [
    //{
      //  "slot": 1,
        //"type": {
           // "name": "bug",
            //"url": "https://pokeapi.co/api/v2/type/7/"
       // }
    //}
//],
