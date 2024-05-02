const charactersContainer = document.getElementById('characters');
const loadButton = document.getElementById('load');
charactersContainer.innerHTML = '';
let currentCount = 0;
let characters = [];

const filterInput = document.getElementById('filter-name');
const filterSelectSpecies = document.getElementById('species-select');
const filterSelectGender = document.getElementById('gender-select');
const filterSelectStatus = document.getElementById('status-select');

// Загружаем персонажей со всех страниц
async function loadCharacters(page = 1) {
  try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
      characters = characters.concat(response.data.results);
      const nextPage = page + 1;
      const totalPages = response.data.info.pages;

      if (nextPage <= totalPages) {
          loadCharacters(nextPage);
      } else {
          showCharacters(characters);
      }
  } catch (error) {
      console.error(error);
  }
}

// Выводим персонажей на страницу
function showCharacters(charactersToShow) {
    const slicedCharacters = charactersToShow.slice(currentCount, currentCount + 8);
    slicedCharacters.forEach(character => {
        charactersContainer.appendChild(createCharacterElement(character));
        charactersContainer.style.display = 'flex';
    });
    currentCount += 8;
}

function showFilteredCharacters(charactersToShow) {
  charactersToShow.forEach(character => {
      charactersContainer.appendChild(createCharacterElement(character));
      charactersContainer.style.display = 'flex';
  });
  loadButton.style.display = 'none';
}


// Создаем элемент персонажа
function createCharacterElement(character) {
  const characterElement = document.createElement('a');
  characterElement.classList.add('characters__container');
  characterElement.href = "../pages/character-details.html";
  characterElement.innerHTML = `
      <img class="characters__image" src="${character.image}" alt="${character.name}">
      <h6 class="characters__name">${character.name}</h6>
      <p class="characters__species regular">${character.species}</p>
  `;
  characterElement.addEventListener('click', () => {
      localStorage.setItem('selectedCharacterId', character.id);
  });
  return characterElement;
}


// Функция для применения всех фильтров
function applyFilters() {
  const nameValue = filterInput.value.toLowerCase();
  const speciesValue = filterSelectSpecies.value;
  const genderValue = filterSelectGender.value;
  const statusValue = filterSelectStatus.value;

  let filteredCharacters = characters.filter(character => {
    return (!nameValue || character.name.toLowerCase().includes(nameValue)) &&
           (!speciesValue || character.species === speciesValue) &&
           (!genderValue || character.gender === genderValue) &&
           (!statusValue || character.status === statusValue);
    });

  charactersContainer.innerHTML = '';
  showFilteredCharacters(filteredCharacters);
}

// Обработчики событий
window.onload = () => loadCharacters(1);
loadButton.addEventListener('click', () => showCharacters(characters));

// Для фильтров
[filterSelectSpecies, filterSelectGender, filterSelectStatus].forEach(filter => {
    filter.addEventListener('change', applyFilters);
});
filterInput.addEventListener('input', applyFilters);