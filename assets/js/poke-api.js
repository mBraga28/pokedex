
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pkmn = new Pokemon()
    pkmn.number = pokeDetail.id
    pkmn.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pkmn.types = types
    pkmn.type = type

    pkmn.photo = pokeDetail.sprites.other.dream_world.front_default

    pkmn.height = pokeDetail.height/10
    pkmn.weight = pokeDetail.weight/10
    
    const abilities = pokeDetail.abilities.map((ab) => ab.ability.name)
    const [ability1, ability2 = 'not have 2nd ability'] = abilities 
    pkmn.ability1 = ability1  
    pkmn.ability2 = ability2

    pkmn.eggGroups = pokeDetail.egg_groups
    pkmn.eggCycle = pokeDetail.egg_cycle

    return pkmn;
}

pokeApi.getPokemonDetail = (pkmn) => {
    return fetch(pkmn.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
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

pokeApi.getPokeDetail = async (id) => {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    const speciesDetailUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
    const response = await fetch(apiUrl);
    const responseSpecies = await fetch(speciesDetailUrl);
    const pokeDetail = await response.json();
    const pokeSpeciesDetail = await responseSpecies.json();
    return Promise.all([pokeDetail, pokeSpeciesDetail])
        .then(([pokemonData, speciesData]) => {
            const convertedPokemon = convertPokeApiDetailToPokemon(pokemonData);
            
            // Aqui, extraímos o "genus" do speciesData
            const genus = speciesData.genera.find((genus) => genus.language.name === "en").genus;
            // Adicionamos o "genus" ao objeto Pokémon
            convertedPokemon.genus = genus;

            const genderRate = speciesData.gender_rate;
            const eggGroups = speciesData.egg_groups.map((group) => group.name);
            const eggCycle = speciesData.hatch_counter;
            // Chame a função getGenderInfo para obter informações legíveis sobre o gênero
            convertedPokemon.gender = getGenderInfo(genderRate);
            convertedPokemon.eggGroups = eggGroups;
            convertedPokemon.eggCycle = eggCycle;

            return convertedPokemon;
        });
};

function getGenderInfo(genderRate) {
    switch (genderRate) {
        case -1:
            return `<i class="fa-solid fa-genderless" style="color: #02bb17;"></i> Genderless`; // Pokémon sem gênero
        case 1:
            return `<i class="fa-solid fa-mars" style="color: #004bfa;"></i> 87.5%  <i class="fa-solid fa-venus" style="color: #f000dc;"></i> 12.5% `; // Por exemplo, 87.5% machos e 12.5% fêmeas
        case 0:
            return `<i class="fa-solid fa-mars" style="color: #004bfa;"></i> 100%`; // Sem variação de gênero (todos são machos)
        case 2:
            return `<i class="fa-solid fa-mars" style="color: #004bfa;"></i> 75%  25% <i class="fa-solid fa-venus" style="color: #f000dc;"></i>`; // Por exemplo, 75% machos e 25% fêmeas
        case 4:
            return `<i class="fa-solid fa-mars" style="color: #004bfa;"></i> 50%  <i class="fa-solid fa-venus" style="color: #f000dc;"></i> 50%`; // Por exemplo, 50% machos e 50% fêmeas
        case 6:
            return `<i class="fa-solid fa-mars" style="color: #004bfa;"></i> 25%  <i class="fa-solid fa-venus" style="color: #f000dc;"></i> 75%`; // Por exemplo, 25% machos e 75% fêmeas
        case 7:
            return `<i class="fa-solid fa-mars" style="color: #004bfa;"></i> 12.5%  <i class="fa-solid fa-venus" style="color: #f000dc;"></i> 87.5%`; // Por exemplo, 12.5% machos e 87.5% fêmeas
    }
}
