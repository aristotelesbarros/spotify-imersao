// Seleção de elementos do DOM
const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');
const artistContainer = document.querySelector('.grid-container');




// Função para buscar os artistas na API e filtrar corretamente os resultados
function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists`;

    fetch(url)
        .then(response => response.json())
        .then(result => {
            // Filtra os artistas cujo nome começa exatamente com o termo digitado
            const filteredArtists = result.filter(artist => 
                artist.name.toLowerCase().startsWith(searchTerm)
            );

            displayResults(filteredArtists);
        })
        .catch(error => console.error("Erro ao buscar artistas:", error));
}

// Função para exibir os artistas encontrados
function displayResults(result) {
    resultPlaylist.classList.add('hidden'); 
    artistContainer.innerHTML = ''; // Limpa resultados anteriores

    if (result.length === 0) {
        resultArtist.classList.add('hidden'); // Oculta a seção se não houver resultados
        return;
    }

    result.forEach(artist => {
        const artistCard = document.createElement('div');
        artistCard.classList.add('artist-card');

        artistCard.innerHTML = `
            <div class="card-img">
                <img class="artist-img" src="${artist.urlImg}" alt="${artist.name}" />
                <div class="play">
                    <span class="fa fa-solid fa-play"></span>
                </div>
            </div>
            <div class="card-text">
                <span class="artist-name">${artist.name}</span>
                <span class="artist-categorie">Artista</span>
            </div>
        `;

        artistContainer.appendChild(artistCard);
    });

    resultArtist.classList.remove('hidden'); // Exibe a seção de resultados
}

// Evento de input para buscar artistas ao digitar no campo de busca
searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        return;
    }

    requestApi(searchTerm);
});

// Funções para navegação dos botões de seta
arrowLeft.addEventListener('click', function () {
    history.back(); // Volta para a página anterior
});

arrowRight.addEventListener('click', function () {
    history.forward(); // Avança para a próxima página
});
