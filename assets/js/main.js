const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const content = document.querySelector('.content')

const maxRecords = 151
const limit = 10
let offset = 0;
function convertPokemonToLi(pkmn) {
    return `
        <!-- class=pkmn ==> Singular -->
        <li class="pkmn ${pkmn.type}" id="${pkmn.number}">
            <a href="details.html?id=${pkmn.number}">
            <span class="number">#${pkmn.number}</span>
            <span class="name">${pkmn.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pkmn.types.map((type) => `<li class="type ${type}">${type}</li>`).join('') }
                </ol>
                <img src="${pkmn.photo}" alt="${pkmn.name}">
            </div>
            </a>
        </li>
      `
}

function loadPokemonItems(offset, limit) {
        pokeApi.getPokemon(offset, limit).then((pokemon = []) => {
            pokemonList.innerHTML += pokemon.map(convertPokemonToLi).join('')
    })
}

loadPokemonItems(offset, limit)

if (loadMoreButton) {
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

} 
