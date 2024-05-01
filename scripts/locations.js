const locationsContainer = document.getElementById('locations');
const loadButton = document.getElementById('load');
locationsContainer.innerHTML = ''; 
let currentPage = 1;
let locations = [];



function loadLocations(page = 1) {
    axios.get(`https://rickandmortyapi.com/api/location?page=${page}`)
        .then(function (response) {
            locations = response.data.results; 
            showLocations(locations);
        })
        .catch(function (error) {
            console.error(error);
        });
        
}

function showLocations(locations){
    locations.forEach(location => {
        const locationElement = document.createElement('a');
        locationElement.classList.add('locations__container');
        locationElement.href = "../pages/location-details.html";
        locationElement.innerHTML = `
            <h6>${location.name}</h6>
            <p class="regular">${location.type}</p>
        `;
        locationsContainer.appendChild(locationElement);
        locationElement.addEventListener('click', () => {
          localStorage.setItem('selectedLocationId', location.id);
      });
    });
}

window.onload = () => {
  loadLocations(1);
  locationsContainer.style.display = 'flex';
};

/*load more*/
loadButton.addEventListener('click', event => {
  console.log('LOAD MORE', event.type);
  locationsContainer.style.display = 'flex';
  currentPage++;
  loadLocations(currentPage);
});



const filterInput = document.getElementById('filter-name');
const filterSelectType = document.getElementById('type-select');
const filterSelectDimension = document.getElementById('dimension-select');

// Обработчики событий для каждого фильтра
filterInput.addEventListener('input', applyFilters);
filterSelectType.addEventListener('change', applyFilters);
filterSelectDimension.addEventListener('change', applyFilters);

// Функция для применения всех фильтров
function applyFilters() {
  let filteredLocations = locations;

  const nameValue = filterInput.value.toLowerCase();
  const typeValue = filterSelectType.value;
  const dimensionValue = filterSelectDimension.value;

  if (nameValue) {
    filteredLocations = filteredLocations.filter(location =>
      location.name.toLowerCase().includes(nameValue)
    );
  }

  if (typeValue) {
    filteredLocations = filteredLocations.filter(location =>
      location.type === typeValue
    );
  }

  if (dimensionValue) {
    filteredLocations = filteredLocations.filter(location =>
      location.dimension === dimensionValue
    );
  }

  locationsContainer.innerHTML = '';
  showLocations(filteredLocations);
}