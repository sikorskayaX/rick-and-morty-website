﻿const characterMain = document.getElementById('character__main');
const selectedCharacterId = localStorage.getItem('selectedCharacterId');
const goBack = document.getElementById('back');

// Загрузка персонажа по переданному в local storage id
async function loadCharacter() {
    try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${selectedCharacterId}`);
        const character = response.data;
        const episodes = await loadEpisodes(character.episode);
        showCharacter(character, episodes);
    } catch (error) {
        console.error(error);
    }
}

// Загрузка эпизодов, в которых присутствует персонаж
async function loadEpisodes(episodeUrls) {
    const episodePromises = episodeUrls.map(url => axios.get(url));
    const responses = await Promise.all(episodePromises);
    return responses.map(response => response.data);
}

// Создание элемента в поле информации
function createElementWithText(tag, textContent, className = '') {
    const element = document.createElement(tag);
    element.textContent = textContent;
    if (className) {
        element.classList.add(className);
    }
    return element;
}

// Отображение персонажа
function showCharacter(character, episodes) {
    characterMain.innerHTML = '';

    const characterPropertiesHead = createElementWithText('div', '', 'character__head');
    characterPropertiesHead.innerHTML = `
        <img src="${character.image}" alt="${character.name}" class="character__image">
        <h1>${character.name}</h1>
    `;
    characterMain.appendChild(characterPropertiesHead);

    const characterProperties = createElementWithText('div', '', 'character__properties');
    characterProperties.appendChild(createCharacterInformationSection(character));
    characterProperties.appendChild(createCharacterEpisodesSection(episodes));
    characterMain.appendChild(characterProperties);
}

// Создание элемента информации о персонаже
function createCharacterInformationElement(label, value, elementClass, locationUrl) {
    const characterInformationElement = createElementWithText('div', '', elementClass);
    const titleElement = createElementWithText('h3', label, 'character__info-title');
    const valueElement = createElementWithText('p', value, 'small');

    characterInformationElement.appendChild(titleElement);
    characterInformationElement.appendChild(valueElement);

    // Если есть информация о локации и она не "unknown"
    if(locationUrl && value.toLowerCase() !== 'unknown'){
        characterInformationElement.addEventListener('click', () => handleLocationClick(locationUrl));
    } else if (value.toLowerCase() === 'unknown') {
        // Если имя "unknown", добавляем обработчик для alert
        characterInformationElement.addEventListener('click', () => alert('Unknown location'));
    }
    return characterInformationElement;
}

// Создание раздела с информацией о персонаже
function createCharacterInformationSection(character) {
    const characterInformations = createElementWithText('div', '', 'character__informations');
    characterInformations.innerHTML = `<h2 class = "character__informations-title">Informations</h2>`;

    const properties = [
        { label: 'Gender', value: character.gender },
        { label: 'Status', value: character.status },
        { label: 'Species', value: character.species },
        { label: 'Type', value: character.type || 'Unknown' },
    ];

    properties.forEach(prop => {
        characterInformations.appendChild(createCharacterInformationElement(prop.label, prop.value, 'character__information'));
    });

    // Кликабельный элемент origin 
    characterInformations.appendChild(createCharacterInformationElement('Origin', character.origin.name, 'character__information-clickable', character.origin.url));

    // Кликабельный элемент location 
    characterInformations.appendChild(createCharacterInformationElement('Location', character.location.name, 'character__information-clickable', character.location.url));

    return characterInformations;
}


// Создание раздела с эпизодами, в которых есть персонаж
function createCharacterEpisodesSection(episodes) {
    const characterEpisodes = createElementWithText('div', '', 'character__episodes');
    const characterEpisodesContainer = createElementWithText('div', '', 'character__episodes-container');
    characterEpisodes.innerHTML = `<h2 class = "character__informations-title">Episodes</h2>`;

    episodes.forEach(episode => {
        const episodeElement = createElementWithText('div', '', 'character__episode');
        episodeElement.innerHTML = `
            <h3 class="character__info-title">${episode.episode}</h3>
            <p class="small">${episode.name}</p>
            <p class="little">${episode.air_date}</p>
        `;
        episodeElement.addEventListener('click', () => handleEpisodeClick(episode.id));
        characterEpisodesContainer.appendChild(episodeElement);
    });

    characterEpisodes.appendChild(characterEpisodesContainer);
    return characterEpisodes;
}


// Запись id локации в local storage и добавление ссылки для локаций
function handleLocationClick(url) {
    const locationID = url.match(/\d+/);
    localStorage.setItem('selectedLocationId', locationID[0]);
    window.location.href = "../pages/location-details.html";
}


// Запись id локации в local storage и добавление ссылки для эпизодов
function handleEpisodeClick(episodeId) {
    localStorage.setItem('selectedEpisodeId', episodeId);
    window.location.href = "../pages/episode-details.html";
}

// Добавляем обработчик клика для кнопки goBack
goBack.addEventListener('click', () => {
    window.history.back();
});

window.onload = loadCharacter;