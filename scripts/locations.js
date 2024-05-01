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

/*filter*/
filterInput.addEventListener('input', () => {
    const filteredLocations = locations.filter(location =>
      location.name.toLowerCase().includes(filterInput.value.toLowerCase())
    );
    locationsContainer.innerHTML = ''; 
    showlocations(filteredLocations)
  });

  locationsContainer.addEventListener('click', () => {
    console.log('click');
  });