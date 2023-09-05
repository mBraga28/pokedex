function convertPokemonTypesToLi(pkmnTypes) {
    return pkmnTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`) 
}

function convertPokemonToLi(pkmn) {
    return `
                <li class="pkmn">
                    <span class="number">#${pkmn.order}</span>
                    <span class="name">${pkmn.name}</span>

                    <div class="detail">
                        <ol class="types">
                            ${convertPokemonTypesToLi(pkmn.types).join('')}
                        </ol>
                        <img src="${pkmn.sprites.other.dream_world.front_default}" alt="${pkmn.name}">
                    </div>
                </li>
            `
}

const pokemonList = document.getElementById('pokemonList');


pokeApi.getPokemon().then((pokemon = []) => {
    pokemonList.innerHTML += pokemon.map(convertPokemonToLi).join('')
})

