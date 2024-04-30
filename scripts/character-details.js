﻿const characterMain = document.getElementById('character__main');
const selectedCharacterId = localStorage.getItem('selectedCharacterId');
/*characterProperties.innerHTML = ''; */
let episodes = [];

function loadCharacter() {
    axios.get(`https://rickandmortyapi.com/api/character/${selectedCharacterId}`)
    .then(function (response) {
        const character = response.data;
        loadEpisode(character);
    })
    .catch(function (error) {
        console.error(error);
    });  
}    

function loadEpisode(character) {
     // Create an array to hold all the episode promises
     const episodePromises = character.episode.map(episodeAPI => 
        axios.get(episodeAPI)
    );
 
     // Use Promise.all to wait for all the episode promises to resolve
     Promise.all(episodePromises)
         .then(function (responses) {
             // Map the responses to get the data for each episode
             const episodes = responses.map(response => response.data);
             showCharacter(character, episodes);
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

function showCharacter(character, episodes) {
    characterMain.innerHTML = '';

    const characterPropertiesHead = createElementWithText('div', '', 'character__head');
    characterPropertiesHead.innerHTML = `
        <img src="${character.image}" alt="${character.name}" class="character__image">
        <h1>${character.name}</h1>
    `;
    characterMain.appendChild(characterPropertiesHead);


    const characterEpisodes = createElementWithText('div', '', 'character__episodes');
    const characterEpisodesTitle = createElementWithText('h2', 'Episodes');
    characterEpisodes.appendChild(characterEpisodesTitle);

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

    episodes.map(episode => {
        characterEpisodes.innerHTML += `
        <p class="bold">${episode.episode}</p>
        <p class="small">${episode.name}</p>
        <p class="little">${episode.air_date}</p>
    `;
    });

    const characterProperties = createElementWithText('div', '', 'character__properties');
    characterProperties.appendChild(characterInformations);
    characterProperties.appendChild(characterEpisodes);
    characterMain.appendChild(characterProperties);
}

window.onload = loadCharacter;