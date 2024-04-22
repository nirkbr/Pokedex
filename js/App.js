const pokemonName = document.querySelector(".pokemon-name");
const pokemonNumber = document.querySelector(".pokemon-number");
const PokemonIMG = document.querySelector(".pokemon-imagem");

const form = document.querySelector(".form")
const input = document.querySelector(".input__search")
const buttomPrev = document.querySelector(".bts-prev")
const buttomNext = document.querySelector(".bts-next")

let searchPokemon = 1;


const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status === 200 ) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'loading ...'
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        PokemonIMG.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        PokemonIMG.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else {
        PokemonIMG.computedStyleMap.display = 'none'
        pokemonName.innerHTML = 'not found :c';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttomPrev.addEventListener('click', () => {
    if (searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
});

buttomNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon)
}) ;

renderPokemon(searchPokemon);