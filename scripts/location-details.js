const selectedLocationId = localStorage.getItem('selectedLocationId');
const charactersContainer = document.getElementById('characters');
charactersContainer.innerHTML = '';
const goBack = document.getElementById('back');
let characters = [];

// Загрузка информации о локации
async function loadLocation() {
    try {
        const response = await axios.get(`https://rickandmortyapi.com/api/location/${selectedLocationId}`);
        const location = response.data;
        await loadResidents(location.residents);
        showLocationDetails(location);
    } catch (error) {
        console.error(error);
    }
}

// Загрузка жителей локации
async function loadResidents(residentURLs) {
    try {
        const residentPromises = residentURLs.map(url => axios.get(url));
        const responses = await Promise.all(residentPromises);
        characters = responses.map(response => response.data);
        showCharacters(characters);
    } catch (error) {
        console.error(error);
    }
}

// Отображение информации о локации
function showLocationDetails(location) {
    const locationAbout = document.getElementById('location__about');
    locationAbout.classList.add('location__about');
    locationAbout.innerHTML = `
        <p class="big">${location.name}</p>
        <div class="location__properties">
            <div class="location__type">
                <h4>Type</h4>
                <p class="small">${location.type}</p>
            </div>
            <div class="location__dimension">
                <h4>Dimension</h4>
                <p class="small">${location.dimension}</p>
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

window.onload = loadLocation;

