import fs from 'fs';
import { fileURLToPath } from 'url'; 
import path from 'path';

// Obtiene la ruta del directorio actual del módulo
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const dataFilePath = path.join(currentDir, 'pokemon.json');

// Lee los datos de Pokémon desde el archivo JSON
export const readPokemonData = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error al leer el archivo de datos:', error);
    return [];
  }
};

// Escribe los datos de Pokémon en el archivo JSON
export const writePokemonData = (pokemonData) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(pokemonData, null, 2));
  } catch (error) {
    console.error('Error al escribir en el archivo de datos:', error);
  }
};