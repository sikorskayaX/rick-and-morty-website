const episodesContainer = document.getElementById('episodes');
const loadButton = document.getElementById('load');
episodesContainer.innerHTML = ''; 
let currentPage = 1;
let episodes = [];

const episodeProperties = document.getElementById('episode__properties');
console.log(episodeProperties)

/*загружаем персонажей*/
function loadEpisodes(page = 1) {
    axios.get(`https://rickandmortyapi.com/api/episode?page=${page}`)
        .then(function (response) {
            episodes = response.data.results; 
            showEpisodes(episodes);
        })
        .catch(function (error) {
            console.error(error);
        });
        
}

/*выводим персонажей на страницу*/
function showEpisodes(episodes){
    episodes.forEach(episode => {
        const episodeElement = document.createElement('a');
        episodeElement.classList.add('episodes__container');
        episodeElement.href = "../pages/episode-details.html";
        episodeElement.innerHTML = `
            <h6>${episode.name}</h6>
            <p class="regular">${episode.air_date}</p>
            <p class="bold">${episode.episode}</p>
        `;
        episodesContainer.appendChild(episodeElement);
        episodeElement.addEventListener('click', () => {
          localStorage.setItem('selectedEpisodeId', episode.id);
      });
    });
}

window.onload = () => {
  loadEpisodes(1);
  episodesContainer.style.display = 'flex';
};

/*load more*/
loadButton.addEventListener('click', event => {
  console.log('LOAD MORE', event.type);
  episodesContainer.style.display = 'flex';
  currentPage++;
  loadEpisodes(currentPage);
});



const filterInput = document.getElementById('filter-name');

/*filter*/
filterInput.addEventListener('input', () => {
    const filteredEpisodes = episodes.filter(episode =>
      episode.episode.toLowerCase().includes(filterInput.value.toLowerCase())
    );
    episodesContainer.innerHTML = ''; 
    showEpisodes(filteredEpisodes)
  });

  episodesContainer.addEventListener('click', () => {
    console.log('click');
  });