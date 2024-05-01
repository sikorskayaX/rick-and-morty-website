const selectedLocationId = localStorage.getItem('selectedLocationId');
const charactersContainer = document.getElementById('characters');
charactersContainer.innerHTML = ''; 
let characters = [];

function loadLocation() {
    axios.get(`https://rickandmortyapi.com/api/location/${selectedLocationId}`)
    .then(function (response) {
        const location = response.data;
        loadResidents(location)
    })
    .catch(function (error) {
        console.error(error);
    });  
}   

function loadResidents(location) {
    // Create an array to hold all the location promises
    const residentPromises = location.residents.map(residentAPI => 
       axios.get(residentAPI)
   );

    // Use Promise.all to wait for all the location promises to resolve
    Promise.all(residentPromises)
        .then(function (responses) {
            // Map the responses to get the data for each location
            characters = responses.map(response => response.data);
            showLocation(location, characters);
            console.log(characters)
        })
        .catch(function (error) {
            console.error(error);
        });
}

function showLocation(location, characters){
    console.log(location)
    // Create the main container for the location about section
    const locationAbout = document.getElementById('location__about');
    locationAbout.classList.add('location__about');
    locationAbout.innerHTML = '';

    // Get the location div
    const locationContainer = document.querySelector('.location');
    locationContainer.classList.add('location__properties');


    // Create the "Earth (Replacement Dimension)" paragraph
    const locationNameParagraph = document.createElement('p');
    locationNameParagraph.classList.add('big');
    locationNameParagraph.textContent = location.name;

    // Create the location__properties div
    const locationPropertiesDiv = document.createElement('div');
    locationPropertiesDiv.classList.add('location__properties');

    // Create the location__type div
    const locationTypeDiv = document.createElement('div');
    locationTypeDiv.classList.add('location__type');

    // Create the location__type h4 and p elements
    const locationTypeTitle = document.createElement('h4');
    locationTypeTitle.textContent = 'Type';
    const locationTypeValue = document.createElement('p');
    locationTypeValue.classList.add('small');
    locationTypeValue.textContent = location.type;

    // Append the location__type elements
    locationTypeDiv.appendChild(locationTypeTitle);
    locationTypeDiv.appendChild(locationTypeValue);

    // Create the location__dimension div
    const locationDimensionDiv = document.createElement('div');
    locationDimensionDiv.classList.add('location__dimension');

    // Create the location__dimension h4 and p elements
    const locationDimensionTitle = document.createElement('h4');
    locationDimensionTitle.textContent = 'Dimension';
    const locationDimensionValue = document.createElement('p');
    locationDimensionValue.classList.add('small');
    locationDimensionValue.textContent = location.dimension;

    // Append the location__dimension elements
    locationDimensionDiv.appendChild(locationDimensionTitle);
    locationDimensionDiv.appendChild(locationDimensionValue);

    // Append the location__type and location__dimension divs to the location__properties div
    locationPropertiesDiv.appendChild(locationTypeDiv);
    locationPropertiesDiv.appendChild(locationDimensionDiv);

    // Append the location__name paragraph and location__properties div to the location__about div
    locationAbout.appendChild(locationNameParagraph);
    locationAbout.appendChild(locationPropertiesDiv);

    // Append the location__about div to the location div
    locationContainer.appendChild(locationAbout);



    characters.forEach(character => {
        const characterElement = document.createElement('a');
        characterElement.classList.add('characters__container');
        characterElement.href = "../pages/character-details.html";
        characterElement.innerHTML = `
            <img class="characters__image" src="${character.image}" alt="${character.name}">
            <h6 class="characters__name">${character.name}</h6>
            <p class="characters__species regular">Вид: ${character.species}</p>
        `;
        charactersContainer.appendChild(characterElement);
        charactersContainer.style.display = 'flex';
        characterElement.addEventListener('click', () => {
          localStorage.setItem('selectedCharacterId', character.id);
      });
    });

    locationContainer.appendChild(charactersContainer);


}



window.onload = loadLocation();