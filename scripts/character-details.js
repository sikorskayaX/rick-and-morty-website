const characterMain = document.getElementById('character__main');
const characterProperties = document.getElementById('character__properties');
const selectedCharacterId = localStorage.getItem('selectedCharacterId');
/*characterProperties.innerHTML = ''; */


function loadCharacter() {
    axios.get(`https://rickandmortyapi.com/api/character/${selectedCharacterId}`)
    .then(function (response) {
        const character = response.data;
        showCharacter(character);
        console.log(character)
    })
    .catch(function (error) {
        console.error(error);
    });  
}    

function showCharacter(character){
    characterMain.innerHTML = ''; 
    const characterPropertiesHead = document.createElement('div');
    characterPropertiesHead.classList.add('character__head');
    characterPropertiesHead.innerHTML = `
        <img src="${character.image}" alt="${character.name}" class="character__image">
        <h1>${character.name}</h1>
        `;
    characterMain.appendChild(characterPropertiesHead);
}


window.onload = loadCharacter;