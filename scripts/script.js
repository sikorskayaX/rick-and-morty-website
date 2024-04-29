const charactersContainer = document.getElementById('characters');
const loadButton = document.getElementById('load');
charactersContainer.innerHTML = ''; 
let currentPage = 1;
let characters = [];

function loadCharacters(page = 1) {
    axios.get(`https://rickandmortyapi.com/api/character?page=${page}`)
        .then(function (response) {
            characters = response.data.results; 
            characters.forEach(character => {
                const characterElement = document.createElement('div');
                characterElement.classList.add('characters__container');
                characterElement.innerHTML = `
                    <img class="characters__image" src="${character.image}" alt="${character.name}">
                    <h6 class="characters__name">${character.name}</h6>
                    <p class="characters__species regular">Вид: ${character.species}</p>
                `;
                charactersContainer.appendChild(characterElement);
            });
        })
        .catch(function (error) {
            console.error(error);
        });
}

window.onload = function() {
  loadCharacters(1);
  charactersContainer.style.display = 'flex';
};


loadButton.addEventListener('click', function (event) {
  console.log('LOAD MORE', event.type);
  charactersContainer.style.display = 'flex';
  currentPage++;
  loadCharacters(currentPage);
});



const filterInput = document.getElementById('filter-name');


filterInput.addEventListener('input', function () {
    const filteredCharacters = characters.filter(character =>
      character.name.toLowerCase().includes(filterInput.value.toLowerCase())
    );
    console.log(filteredCharacters);
    charactersContainer.innerHTML = ''; 
    filteredCharacters.forEach(character => {
        const characterElement = document.createElement('div');
        characterElement.classList.add('characters__container');
        characterElement.innerHTML = `
            <img class="characters__image" src="${character.image}" alt="${character.name}">
            <h6 class="characters__name">${character.name}</h6>
            <p class="characters__species regular">Вид: ${character.species}</p>
        `;
        charactersContainer.appendChild(characterElement);
    });
  });

