

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


pokeApi.getPokemon().then((pokemon = []) => {
    pokemonList.innerHTML += pokemon.map(convertPokemonToLi).join('')
})

