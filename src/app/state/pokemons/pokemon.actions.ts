import { createAction, props } from '@ngrx/store';
import { Pokemon } from '../../models/pokemon.model';

export const loadPokemons = createAction('[Pokemons Page] Load Pokemons');

export const loadPokemonsSuccess = createAction(
  '[Pokemon API] Pokemons Load Success',
  props<{ pokemons: Pokemon[] }>()
);

export const loadPokemonsFailure = createAction(
  '[Pokemon API] Pokemons Load Failure',
  props<{ error: string }>()
);

export const savePokemons = createAction(
  '[Pokemon Page] Save Pokemons',
  props<{ pokemon: Pokemon }>()
);

