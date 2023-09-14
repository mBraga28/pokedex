const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        // Verifica se 'id' é válido (um número)
        if (id && !isNaN(id)) {
            // Chama a função para exibir detalhes do Pokémon com a ID fornecida
            displayPokemonDetails(id);
        } else {
            // Caso 'id' não seja válido, redireciona de volta para a página inicial (ou faça outra ação apropriada)
            window.location.href = 'index.html'; // Você pode alterar o destino do redirecionamento
        }