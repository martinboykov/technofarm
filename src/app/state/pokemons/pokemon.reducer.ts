import { createReducer, on } from '@ngrx/store';
import {
  savePokemons,
  loadPokemons,
  loadPokemonsSuccess,
  loadPokemonsFailure,
} from './pokemon.actions';
import { Pokemon } from '../../models/pokemon.model';

export type Status = 'pending' | 'loading' | 'error' | 'success';

export interface PokemonState {
  pokemons: Pokemon[];
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: PokemonState = {
  pokemons: [],
  error: null,
  status: 'pending',
};

export const pokemonReducer = createReducer(
  initialState,
  on(loadPokemons, (state) => ({ ...state, status: 'loading' as Status })),
  on(loadPokemonsSuccess, (state, { pokemons }) => ({
    ...state,
    pokemons: pokemons,
    error: null,
    status: 'success' as Status,
  })),
  on(loadPokemonsFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error' as Status,
  })),
  on(savePokemons, (state, { pokemon }) => ({
    ...state,
    pokemons: [
      ...state.pokemons.map((p) => {
        if(p.id === pokemon.id){
          return pokemon;
        } else {
          return p;
        }
      }) ,
    ],
  }))
);
