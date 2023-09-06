
const pokeApi = {}

function convertPokeApiDeatilToPokemon(pokeDetail) {
    const pkmn = new Pokemon()
    pkmn.number = pokeDetail.id
    pkmn.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pkmn.types = types
    pkmn.type = type

    pkmn.photo = pokeDetail.sprites.other.dream_world.front_default

    return pkmn
}

pokeApi.getPokemonDetail = (pkmn) => {
    return fetch(pkmn.url)
            .then((response) => response.json())
            .then(convertPokeApiDeatilToPokemon)
}

pokeApi.getPokemon = (offset = 0, limit = 10) => {

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
                .then((response) => response.json())
                .then((jsonBody) => jsonBody.results)
                .then((pokemon) => pokemon.map(pokeApi.getPokemonDetail))
                .then((detailRequests) => Promise.all(detailRequests))
                .then((pokemonDetails) => pokemonDetails)
} 
