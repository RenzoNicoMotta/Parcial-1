import express from 'express';
import { getAllPokemon, addNewPokemon, updatePokemon, deletePokemon, getPokemonById, getPokemonByType, getPokemonByGeneration, searchPokemonByName, getPokemonOrderedByGeneration } from '../controllers/pokemonController.js';

const router = express.Router();

router.get('/', getAllPokemon);
router.get('/:id', getPokemonById);
router.get('/order/ordered-by-generation', getPokemonOrderedByGeneration);
router.get('/type/:type', getPokemonByType);
router.get('/generation/:gen', getPokemonByGeneration);
router.get('/search/:name', searchPokemonByName);
router.post('/', addNewPokemon);
router.put('/:id', updatePokemon);
router.delete('/:id', deletePokemon);

export default router;
