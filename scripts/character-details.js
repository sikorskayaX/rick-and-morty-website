const characterMain = document.getElementById('character__main');
const characterProperties = document.getElementById('character__properties');
const selectedCharacterId = localStorage.getItem('selectedCharacterId');
/*characterProperties.innerHTML = ''; */


function loadCharacter() {
    axios.get(`https://rickandmortyapi.com/api/character/${selectedCharacterId}`)
    .then(function (response) {
        const character = response.data;
        showCharacter(character);
        console.log(character)
    })
    .catch(function (error) {
        console.error(error);
    });  
}    

function createElementWithText(tag, textContent, className) {
    const element = document.createElement(tag);
    element.textContent = textContent;
    if (className) {
        element.classList.add(className);
    }
    return element;
}

function showCharacter(character) {
    characterMain.innerHTML = '';

    const characterPropertiesHead = createElementWithText('div', '', 'character__head');
    characterPropertiesHead.innerHTML = `
        <img src="${character.image}" alt="${character.name}" class="character__image">
        <h1>${character.name}</h1>
    `;
    characterMain.appendChild(characterPropertiesHead);

    const characterInformations = createElementWithText('div', '', 'character__informations');
    const characterInformationsTitle = createElementWithText('h2', 'Informations');
    characterInformations.appendChild(characterInformationsTitle);

    const properties = [
        { label: 'Gender', value: character.gender },
        { label: 'Status', value: character.status },
        { label: 'Species', value: character.species },
        { label: 'Origin', value: character.origin.name },
        { label: 'Type', value: character.type ? character.type.name : 'Unknown' }, 
        { label: 'Location', value: character.location.name }
    ];

    properties.forEach(prop => {
        const propertyTitle = createElementWithText('h3', prop.label);
        const propertyValue = createElementWithText('p', prop.value);
        characterInformations.appendChild(propertyTitle);
        characterInformations.appendChild(propertyValue);
    });

    characterMain.appendChild(characterInformations);
}



window.onload = loadCharacter;