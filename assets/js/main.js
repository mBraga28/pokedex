

const offset = 0;
const limit = 10;

const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

function convertPokemonToLi(pkmn) {
    return `
                <li class="pkmn">
                    <span class="number">#001</span>
                    <span class="name">${pkmn.name}</span>

                    <div class="detail">
                        <ol class="types">
                            <li class="type">grass</li>
                            <li class="type">poison</li>
                        </ol>
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt="${pkmn.name}">
                    </div>
                </li>
            `
}

const pokemonList = document.getElementById('pokemonList');


fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemon) => {
        
        for (let i = 0; i < pokemon.length; i++) {
            const pkmn = pokemon[i];
            pokemonList.innerHTML += convertPokemonToLi(pkmn);
        }

    })
    .catch((error) => console.error(error));

