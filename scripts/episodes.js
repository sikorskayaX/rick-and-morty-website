const episodesContainer = document.getElementById('episodes');
const loadButton = document.getElementById('load');
episodesContainer.innerHTML = '';
let currentCount = 0;
let episodes = [];

const filterInput = document.getElementById('filter-name');

// Load episodes from all pages
async function loadEpisodes(page = 1) {
  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/episode?page=${page}`);
    episodes = episodes.concat(response.data.results);
    const nextPage = page + 1;
    const totalPages = response.data.info.pages;

    if (nextPage <= totalPages) {
      await loadEpisodes(nextPage);
    } else {
      showEpisodes(episodes);
    }
  } catch (error) {
    console.error(error);
  }
}

// Display episodes on the page
function showEpisodes(episodesToShow) {
  const slicedEpisodes = episodesToShow.slice(currentCount, currentCount + 12);
  slicedEpisodes.forEach(episode => {
    episodesContainer.appendChild(createEpisodeElement(episode));
    episodesContainer.style.display = 'flex';
  });
  currentCount += 12;
}

function showFilteredEpisodes(episodesToShow) {
  episodesToShow.forEach(episode => {
    episodesContainer.appendChild(createEpisodeElement(episode));
    episodesContainer.style.display = 'flex';
  });
  loadButton.style.display = 'none';
}

// Create an episode element
function createEpisodeElement(episode) {
  const episodeElement = document.createElement('a');
  episodeElement.classList.add('episodes__container');
  episodeElement.href = "../pages/episode-details.html";
  episodeElement.innerHTML = `
      <h6>${episode.name}</h6>
      <p class="regular">${episode.air_date}</p>
      <p class="bold">${episode.episode}</p>
  `;
  episodeElement.addEventListener('click', () => {
    localStorage.setItem('selectedEpisodeId', episode.id);
  });
  return episodeElement;
}

// Function to apply filter
function applyFilter() {
  const nameValue = filterInput.value.toLowerCase();

  let filteredEpisodes = episodes.filter(episode => {
    return !nameValue || episode.name.toLowerCase().includes(nameValue);
  });

  episodesContainer.innerHTML = '';
  showFilteredEpisodes(filteredEpisodes);
}

// Event handlers
window.onload = () => loadEpisodes(1);
loadButton.addEventListener('click', () => showEpisodes(episodes));
filterInput.addEventListener('input', applyFilter);
