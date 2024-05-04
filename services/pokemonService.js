import { Pokemon } from '../models/pokemonModel.js';

let pokemonDB = [
];

export const getAllPokemon = () => {
  return pokemonDB;
};

export const getPokemonById = (id) => {
  return pokemonDB.find(pokemon => pokemon.id === id);
};

export const addPokemon = (pokemon) => {
  pokemon.id = pokemonDB.length + 1;
  pokemonDB.push(pokemon);
  return pokemon;
};

export const updatePokemon = (id, updatedPokemon) => {
  const index = pokemonDB.findIndex(pokemon => pokemon.id === id);
  if (index !== -1) {
    pokemonDB[index] = { ...updatedPokemon, id };
    return pokemonDB[index];
  }
  return null;
};

export const deletePokemon = (id) => {
  const index = pokemonDB.findIndex(pokemon => pokemon.id === id);
  if (index !== -1) {
    const deletedPokemon = pokemonDB.splice(index, 1);
    return deletedPokemon[0];
  }
  return null;
};

export const filterPokemonByType = (type) => {
  return pokemonDB.filter(pokemon => pokemon.type.toLowerCase() === type.toLowerCase());
};

export const sortPokemonByName = () => {
  return pokemonDB.slice().sort((a, b) => a.name.localeCompare(b.name));
};

export const paginatePokemon = (page, limit) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return pokemonDB.slice(startIndex, endIndex);
};
