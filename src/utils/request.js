import axios from 'axios';

const BACKEND_URL = 'https://pokeapi.co/api/v2/'

export async function fetchPokemons (){
    const response = await axios.get(BACKEND_URL+ 'pokemon?limit=100000&offset=0');

    console.log(response);
   const pokemons = [];

    for(const results in pokemons.data){
        const pokemonObj = {
            id: results,
            name: pokemons.data[results].name,
            url: pokemons.data[results].url,
        }
    };
}