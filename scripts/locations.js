const locationsContainer = document.getElementById('locations');
const loadButton = document.getElementById('load');
locationsContainer.innerHTML = '';
let currentCount = 0;
let locations = [];

const filterInput = document.getElementById('filter-name');
const filterSelectType = document.getElementById('type-select');
const filterSelectDimension = document.getElementById('dimension-select');

// Load locations from all pages using async/await
async function loadLocations(page = 1) {
  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/location?page=${page}`);
    locations = locations.concat(response.data.results);
    const nextPage = page + 1;
    const totalPages = response.data.info.pages;

    if (nextPage <= totalPages) {
      await loadLocations(nextPage);
    } else {
      showLocations(locations);
    }
  } catch (error) {
    console.error(error);
  }
}

// Display locations on the page
function showLocations(locationsToShow) {
  const slicedLocations = locationsToShow.slice(currentCount, currentCount + 12);
  slicedLocations.forEach(location => {
    locationsContainer.appendChild(createLocationElement(location));
    locationsContainer.style.display = 'flex';
  });
  currentCount += 12;
}

function showFilteredLocations(locationsToShow) {
  locationsToShow.forEach(location => {
    locationsContainer.appendChild(createLocationElement(location));
    locationsContainer.style.display = 'flex';
  });
  loadButton.style.display = 'none';
}

// Create a location element
function createLocationElement(location) {
  const locationElement = document.createElement('a');
  locationElement.classList.add('locations__container');
  locationElement.href = "../pages/location-details.html";
  locationElement.innerHTML = `
      <h6>${location.name}</h6>
      <p class="regular">${location.type}</p>
  `;
  locationElement.addEventListener('click', () => {
    localStorage.setItem('selectedLocationId', location.id);
  });
  return locationElement;
}

// Function to apply all filters
function applyFilters() {
  const nameValue = filterInput.value.toLowerCase();
  const typeValue = filterSelectType.value;
  const dimensionValue = filterSelectDimension.value;

  let filteredLocations = locations.filter(location => {
    return (!nameValue || location.name.toLowerCase().includes(nameValue)) &&
           (!typeValue || location.type === typeValue) &&
           (!dimensionValue || location.dimension === dimensionValue);
  });

  locationsContainer.innerHTML = '';
  showFilteredLocations(filteredLocations);
}

// Event handlers
window.onload = () => loadLocations(1);
loadButton.addEventListener('click', () => showLocations(locations));

// For filters
[filterSelectType, filterSelectDimension].forEach(filter => {
  filter.addEventListener('change', applyFilters);
});
filterInput.addEventListener('input', applyFilters);
