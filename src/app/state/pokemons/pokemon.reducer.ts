import { createReducer, on } from '@ngrx/store';
import {
  savePokemons,
  loadPokemons,
  loadPokemonsSuccess,
  loadPokemonsFailure,
} from './pokemon.actions';
import { Pokemon } from '../../models/pokemon.model';

export interface PokemonState {
  pokemons: Pokemon[];
  error: string | null;
  isLoading: boolean;
}

export const initialState: PokemonState = {
  pokemons: [],
  error: null,
  isLoading: false,
};

export const pokemonReducer = createReducer(
  initialState,
  on(loadPokemons, (state) => ({ ...state, isLoading: true })),
  on(loadPokemonsSuccess, (state, { pokemons }) => ({
    ...state,
    pokemons: pokemons,
    error: null,
    isLoading: false,
  })),
  on(loadPokemonsFailure, (state, { error }) => ({
    ...state,
    error: error,
    isLoading: false,
  })),
  on(savePokemons, (state, { pokemon }) => ({
    ...state,
    pokemons: [
      ...state.pokemons.map((p) => {
        if (p.id === pokemon.id) {
          return { ...pokemon };
        } else {
          return p;
        }
      }),
    ],
  }))
);
