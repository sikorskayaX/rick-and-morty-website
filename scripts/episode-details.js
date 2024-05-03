const selectedEpisodeId = localStorage.getItem('selectedEpisodeId');
const charactersContainer = document.getElementById('characters');
charactersContainer.innerHTML = '';
const goBack = document.getElementById('back');
let characters = [];

// Загрузка информации об эпизоде
async function loadEpisode() {
    try {
        const response = await axios.get(`https://rickandmortyapi.com/api/episode/${selectedEpisodeId}`);
        const episode = response.data;
        await loadCharacters(episode.characters);
        showEpisodeDetails(episode);
    } catch (error) {
        console.error(error);
    }
}

// Загрузка персонажей, участвующих в эпизоде
async function loadCharacters(characterURLs) {
    try {
        const characterPromises = characterURLs.map(url => axios.get(url));
        const responses = await Promise.all(characterPromises);
        characters = responses.map(response => response.data);
        showCharacters(characters);
    } catch (error) {
        console.error(error);
    }
}

// Отображение информации об эпизоде
function showEpisodeDetails(episode) {
    const episodeAbout = document.getElementById('episode__about');
    episodeAbout.classList.add('episode__about');
    episodeAbout.innerHTML = `
        <p class="big">${episode.name}</p>
        <div class="episode__properties">
            <div class="episode__number">
                <h4>Episode</h4>
                <p class="small">${episode.episode}</p>
            </div>
            <div class="episode__date">
                <h4>Date</h4>
                <p class="small">${episode.air_date}</p>
            </div>
        </div>
    `;
}

// Отображение персонажей
function showCharacters(characters) {
    charactersContainer.style.display = 'flex';
    characters.forEach(character => {
        const characterElement = createCharacterElement(character);
        charactersContainer.appendChild(characterElement);
    });
}

// Создание элемента с информацией о персонаже
function createCharacterElement(character) {
    const characterElement = createElementWithText('a', '', 'characters__container');
    characterElement.href = "../pages/character-details.html";
    characterElement.innerHTML = `
        <img class="characters__image" src="${character.image}" alt="${character.name}">
        <h6 class="characters__name">${character.name}</h6>
        <p class="characters__species regular">Вид: ${character.species}</p>
    `;
    characterElement.addEventListener('click', () => {
        localStorage.setItem('selectedCharacterId', character.id);
    });
    return characterElement;
}

// Создание элемента с текстом
function createElementWithText(tag, textContent, className = '') {
    const element = document.createElement(tag);
    element.textContent = textContent;
    if (className) {
        element.classList.add(className);
    }
    return element;
}

// Добавляем обработчик клика для кнопки goBack
goBack.addEventListener('click', () => {
    window.history.back();
});

window.onload = loadEpisode;

