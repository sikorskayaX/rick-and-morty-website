const selectedEpisodeId = localStorage.getItem('selectedEpisodeId');

const charactersContainer = document.getElementById('characters');
charactersContainer.innerHTML = ''; 
let characters = [];

function loadEpisode() {
    axios.get(`https://rickandmortyapi.com/api/episode/${selectedEpisodeId}`)
    .then(function (response) {
        const episode = response.data;
        loadResidents(episode)
    })
    .catch(function (error) {
        console.error(error);
    });  
}   

function loadResidents(episode) {
    // Create an array to hold all the episode promises
    const residentPromises = episode.characters.map(residentAPI => 
       axios.get(residentAPI)
   );

    // Use Promise.all to wait for all the episode promises to resolve
    Promise.all(residentPromises)
        .then(function (responses) {
            // Map the responses to get the data for each episode
            characters = responses.map(response => response.data);
            showEpisode(episode, characters);
            console.log(characters)
        })
        .catch(function (error) {
            console.error(error);
        });
}

function showEpisode(episode, characters){
    console.log(episode)
    // Create the main container for the episode about section
    const episodeAbout = document.getElementById('episode__about');
    episodeAbout.innerHTML = ''; 

    // Create and append the title
    const episodeTitle = document.createElement('p');
    episodeTitle.className = 'big';
    episodeTitle.textContent = episode.name;
    episodeAbout.appendChild(episodeTitle);

    // Create the properties container
    const episodeProperties = document.createElement('div');
    episodeProperties.className = 'episode__properties';

    // Create and append the episode number section
    const episodeNumber = document.createElement('div');
    episodeNumber.className = 'episode__number';
    const episodeNumberTitle = document.createElement('h4');
    episodeNumberTitle.textContent = 'Episode';
    const episodeNumberValue = document.createElement('p');
    episodeNumberValue.className = 'small';
    episodeNumberValue.textContent = episode.episode;
    episodeNumber.appendChild(episodeNumberTitle);
    episodeNumber.appendChild(episodeNumberValue);

    // Create and append the episode date section
    const episodeDate = document.createElement('div');
    episodeDate.className = 'episode__date';
    const episodeDateTitle = document.createElement('h4');
    episodeDateTitle.textContent = 'Date';
    const episodeDateValue = document.createElement('p');
    episodeDateValue.className = 'small';
    episodeDateValue.textContent = episode.air_date;
    episodeDate.appendChild(episodeDateTitle);
    episodeDate.appendChild(episodeDateValue);

    // Append the number and date sections to the properties container
    episodeProperties.appendChild(episodeNumber);
    episodeProperties.appendChild(episodeDate);

    // Append the properties container to the main about section
    episodeAbout.appendChild(episodeProperties);

    // Assuming there is a parent div with the class 'episode' in your HTML
    const episodeContainer = document.querySelector('.episode');
    episodeContainer.appendChild(episodeAbout);


    characters.forEach(character => {
        const characterElement = document.createElement('a');
        characterElement.classList.add('characters__container');
        characterElement.href = "../pages/character-details.html";
        characterElement.innerHTML = `
            <img class="characters__image" src="${character.image}" alt="${character.name}">
            <h6 class="characters__name">${character.name}</h6>
            <p class="characters__species regular">Вид: ${character.species}</p>
        `;
        episodeContainer.appendChild(characterElement);
        characterElement.addEventListener('click', () => {
          localStorage.setItem('selectedCharacterId', character.id);
      });
    });

}



window.onload = loadEpisode();

