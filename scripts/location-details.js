const selectedLocationId = localStorage.getItem('selectedLocationId');
const charactersContainer = document.getElementById('characters');
charactersContainer.innerHTML = ''; 
let characters = [];

// Загрузка информации о локации
async function loadLocation() {
    try {
        const response = await axios.get(`https://rickandmortyapi.com/api/location/${selectedLocationId}`);
        const location = response.data;
        await loadResidents(location);
    } catch (error) {
        console.error(error);
    }
}

// Загрузка жителей локации
async function loadResidents(location) {
    try {
        const residentPromises = location.residents.map(residentAPI => axios.get(residentAPI));
        const responses = await Promise.all(residentPromises);
        characters = responses.map(response => response.data);
        showLocation(location, characters);
    } catch (error) {
        console.error(error);
    }
}

// Отображение информации о локации и ее жителях
function showLocation(location, characters) {
    const locationAbout = document.getElementById('location__about');
    locationAbout.classList.add('location__about');
    locationAbout.innerHTML = '';

    const locationContainer = document.querySelector('.location');
    locationContainer.classList.add('location__properties');

    // Создание и добавление элементов с информацией о локации
    locationAbout.appendChild(createElementWithText('p', location.name, 'big'));
    locationAbout.appendChild(createLocationProperties(location));

    locationContainer.appendChild(locationAbout);

    // Отображение жителей локации
    characters.forEach(character => {
        const characterElement = createCharacterElement(character);
        charactersContainer.appendChild(characterElement);
    });

    charactersContainer.style.display = 'flex';
    locationContainer.appendChild(charactersContainer);
}

// Создание элемента с информацией о локации
function createLocationProperties(location) {
    const locationPropertiesDiv = createElementWithText('div', '', 'location__properties');
    locationPropertiesDiv.appendChild(createPropertyElement('Type', location.type));
    locationPropertiesDiv.appendChild(createPropertyElement('Dimension', location.dimension));
    return locationPropertiesDiv;
}

// Создание элемента свойства локации
function createPropertyElement(title, value) {
    const propertyDiv = createElementWithText('div', '', `location__${title.toLowerCase()}`);
    propertyDiv.appendChild(createElementWithText('h4', title));
    propertyDiv.appendChild(createElementWithText('p', value, 'small'));
    return propertyDiv;
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

window.onload = loadLocation;
