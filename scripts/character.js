const charactersContainer = document.getElementById('characters');
const loadButton = document.getElementById('load');
charactersContainer.innerHTML = ''; 
let currentPage = 1;
let characters = [];

const characterProperties = document.getElementById('character__properties');
console.log(characterProperties)

/*загружаем персонажей*/
function loadCharacters(page = 1) {
    axios.get(`https://rickandmortyapi.com/api/character?page=${page}`)
        .then(function (response) {
            characters = response.data.results; 
            showCharacters(characters);
        })
        .catch(function (error) {
            console.error(error);
        });
        
}

/*выводим персонажей на страницу*/
function showCharacters(characters){
    characters.forEach(character => {
        const characterElement = document.createElement('a');
        characterElement.classList.add('characters__container');
        characterElement.href = "../pages/character-details.html";
        characterElement.innerHTML = `
            <img class="characters__image" src="${character.image}" alt="${character.name}">
            <h6 class="characters__name">${character.name}</h6>
            <p class="characters__species regular">${character.species}</p>
        `;
        charactersContainer.appendChild(characterElement);
        characterElement.addEventListener('click', () => {
          localStorage.setItem('selectedCharacterId', character.id);
      });
    });
}

window.onload = () => {
  loadCharacters(1);
  charactersContainer.style.display = 'flex';
};

/*load more*/
loadButton.addEventListener('click', event => {
  console.log('LOAD MORE', event.type);
  charactersContainer.style.display = 'flex';
  currentPage++;
  loadCharacters(currentPage);
});


const filterInput = document.getElementById('filter-name');
const filterSelectSpecies = document.getElementById('species-select');
const filterSelectGender = document.getElementById('gender-select');
const filterSelectStatus = document.getElementById('status-select');

// Обработчики событий для каждого фильтра
filterInput.addEventListener('input', applyFilters);
filterSelectSpecies.addEventListener('change', applyFilters);
filterSelectGender.addEventListener('change', applyFilters);
filterSelectStatus.addEventListener('change', applyFilters);

// Функция для применения всех фильтров
function applyFilters() {
  let filteredCharacters = characters;

  const nameValue = filterInput.value.toLowerCase();
  const speciesValue = filterSelectSpecies.value;
  const genderValue = filterSelectGender.value;
  const statusValue = filterSelectStatus.value;

  if (nameValue) {
    filteredCharacters = filteredCharacters.filter(character =>
      character.name.toLowerCase().includes(nameValue)
    );
  }

  if (speciesValue) {
    filteredCharacters = filteredCharacters.filter(character =>
      character.species === speciesValue
    );
  }

  if (genderValue) {
    filteredCharacters = filteredCharacters.filter(character =>
      character.gender === genderValue
    );
  }

  if (statusValue) {
    filteredCharacters = filteredCharacters.filter(character =>
      character.status === statusValue
    );
  }

  charactersContainer.innerHTML = '';
  showCharacters(filteredCharacters);
}

