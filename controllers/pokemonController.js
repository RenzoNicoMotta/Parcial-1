// controllers/pokemonController.js

import { readPokemonData, writePokemonData } from '../data/pokemonData.js';
import { Pokemon } from '../models/pokemonModel.js';

// Obtener todos los Pokémon
export const getAllPokemon = (req, res) => {
  const pokemonData = readPokemonData();

  if (!pokemonData) {
    return res.status(404).json({ message: 'No hay Pokémon disponibles' });
  }

  res.json(pokemonData);
};

// Obtener un Pokémon por su ID
export const getPokemonById = (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonData = readPokemonData();
  const pokemon = pokemonData.find(pokemon => pokemon.id === id);

  if (!pokemon) {
    return res.status(404).json({ message: 'Pokémon no encontrado' });
  }

  res.json(pokemon);
};

// Filtrar Pokémon por tipo
export const getPokemonByType = (req, res) => {
  const type = req.params.type.toLowerCase(); // Obtener el tipo del parámetro de la URL en minúsculas
  const pokemonData = readPokemonData();
  const filteredPokemon = pokemonData.filter(pokemon => pokemon.type.toLowerCase() === type);

  if (filteredPokemon.length === 0) {
    return res.status(404).json({ message: `No se encontraron Pokémon del tipo '${type}'` });
  }

  res.json(filteredPokemon);
};

// Filtrar Pokémon por generación
export const getPokemonByGeneration = (req, res) => {
  const gen = parseInt(req.params.gen);
  const pokemonData = readPokemonData();
  const filteredPokemon = pokemonData.filter(pokemon => pokemon.gen === gen);

  if (filteredPokemon.length === 0) {
    return res.status(404).json({ message: `No se encontraron Pokémon de la generación '${gen}'` });
  }

  res.json(filteredPokemon);
};

// Buscar Pokémon por nombre
export const searchPokemonByName = (req, res) => {
  const searchTerm = req.params.name.toLowerCase();
  const pokemonData = readPokemonData();
  const matchedPokemon = pokemonData.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));

  if (matchedPokemon.length === 0) {
    return res.status(404).json({ message: `No se encontraron Pokémon con el nombre que incluya '${searchTerm}'` });
  }

  res.json(matchedPokemon);
};

export const getPokemonOrderedByGeneration = (req, res) => {
  try {
    const pokemonData = readPokemonData();

    if (!pokemonData) {
      return res.status(404).json({ message: 'No hay Pokémon disponibles' });
    }

    
    
    const sortedPokemon = pokemonData.sort(function(a, b) {
      if (b.gen > a.gen){
        return -1;
      }
    });

    res.json(sortedPokemon);
  } catch (error) {
    console.error('Error al obtener Pokémon ordenados por generación:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Agregar un nuevo Pokémon
export const addNewPokemon = (req, res) => {
  const { name, type, gen } = req.body;
  if (!name || !type || !gen) {
    return res.status(400).send('Nombre , tipo y gen son requeridos');
  }

  const pokemonData = readPokemonData() || []; // Maneja el archivo vacío
  const newPokemon = new Pokemon(pokemonData.length + 1, name, type, gen);
  pokemonData.push(newPokemon);
  writePokemonData(pokemonData);

  res.status(201).json(newPokemon);
};

// Actualizar la información de un Pokémon
export const updatePokemon = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, type, gen } = req.body;

  const pokemonData = readPokemonData();
  const pokemonToUpdate = pokemonData.find(pokemon => pokemon.id === id);

  if (!pokemonToUpdate) {
    return res.status(404).send('Pokémon no encontrado');
  }

  // Actualizar los datos del Pokémon si se proporcionan nuevos valores
  if (name) {
    pokemonToUpdate.name = name;
  }
  if (type) {
    pokemonToUpdate.type = type;
  }
  if (gen) {
    pokemonToUpdate.gen = gen;
  }

  writePokemonData(pokemonData);

  res.json(pokemonToUpdate);
};

// Eliminar un Pokémon
export const deletePokemon = (req, res) => {
  const id = parseInt(req.params.id);

  const pokemonData = readPokemonData();
  const updatedPokemonData = pokemonData.filter(pokemon => pokemon.id !== id);

  if (pokemonData.length === updatedPokemonData.length) {
    return res.status(404).send('Pokémon no encontrado');
  }

  writePokemonData(updatedPokemonData);

  res.json({ message: 'Pokémon eliminado correctamente' });
};
