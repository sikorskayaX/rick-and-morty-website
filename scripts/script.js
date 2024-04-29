function loadCharacters() {
    axios.get('https://rickandmortyapi.com/api/character')
        .then(function (response) {
            const characters = response.data.results; 
            const charactersContainer = document.getElementById('characters');
            charactersContainer.innerHTML = ''; 

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

window.onload = loadCharacters;