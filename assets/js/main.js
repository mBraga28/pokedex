const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;
function convertPokemonToLi(pkmn) {
    return `

        <li class="pkmn ${pkmn.type}">

            <span class="number">#${pkmn.number}</span>
            <span class="name">${pkmn.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pkmn.types.map((type) => `<li class="type ${type}">${type}</li>`).join('') }
                </ol>
                <img src="${pkmn.photo}" alt="${pkmn.name}">
            </div>
            
        </li>
    `
}

function loadPokemonItems(offset, limit) {
        pokeApi.getPokemon(offset, limit).then((pokemon = []) => {
            pokemonList.innerHTML += pokemon.map(convertPokemonToLi).join('')
    })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    debugger
    const qttRecordWithNextPage = offset + limit

    if (qttRecordWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItems(offset, limit)
    }
})
