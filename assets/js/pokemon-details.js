const pkmnDetails = document.getElementById('pokemonDetails')

function displayPokemonDetails(pkmnid) {
    pokeApi.getPokeDetail(pkmnid).then((detail) => {
        // Aqui, você faz uma segunda chamada à API para obter informações de espécies
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${detail.number}`)
            .then((response) => response.json())
            .then((speciesInfo) => {
                // Atualize as informações de espécies no objeto 'detail'
                detail.species = speciesInfo.genera.find((genus) => genus.language.name === "en").genus // Aqui você pode pegar outras informações da espécie, se necessário

                pkmnDetails.innerHTML = `
                <div class="pkmnDetail ${detail.type}" id="${detail.number}">
                    <header>
                        <button id="backToListButton" class="back-button ${detail.type}"><i class="fas fa-arrow-left"></i></button>
                    </header>
                    <span class="number">#${detail.number}</span>
                    <span class="name">${detail.name}</span>
            
                    <div class="detail">
                        <ol class="types">
                            ${detail.types.map((type) => `<li class="type ${type}">${type}</li>`).join('') }
                        </ol>
                        <img src="${detail.photo}" alt="${detail.name}">
                    </div>
                    <div class="detailAbout">
                        <ol id="about" class="pokeAbout">
                            <li class="species"> 
                                <label>Species</label>      ${detail.species}
                            </li>
                            <li class="height">
                                <label>Height</label>       ${detail.height}m
                            </li>
                            <li class="weight">
                                <label>Weight</label>       ${detail.weight}kg
                            </li>
                            <li class="ability">
                                <label>Abilities</label>    ${detail.ability1}, ${detail.ability2}
                            </li>
                            <li class="breeding">
                               <h4>Breeding</h4>  
                                    <div>
                                        <ol class="group">
                                            <li class="gender">
                                                <label>Gender</label>     ${detail.gender}
                                            </li>
                                            <li class="egg-group">
                                                <label>Egg Group</label>     ${detail.eggGroups}
                                            </li>
                                            <li class="egg-cycle">
                                                <label>Egg Cycle</label>     ${detail.eggCycle} cycle(s)
                                            </li>
                                        </ol>
                                    </div>
                            </li>
                        </ol>
                    </div>
            
                  </div>
                `
        
                  // Adicione um event listener para o botão de volta
                  const backToListButton = document.getElementById('backToListButton');
                  backToListButton.addEventListener('click', () => {
                      // Redirecione de volta para a página inicial (lista de Pokémon)
                      window.location.href = 'index.html' // Você pode alterar o destino do redirecionamento
                  })
            })       
        
    })
}
