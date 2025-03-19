import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { PokemonState } from './pokemon.reducer';

export const selectPokemons = (state: AppState) => state.pokemons;
export const selectAllPokemons = createSelector(
  selectPokemons,
  (state: PokemonState) => state.pokemons
);
