import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  savePokemons,
  loadPokemons,
  loadPokemonsSuccess,
  loadPokemonsFailure,
} from './pokemon.actions';
import { of, from } from 'rxjs';
import {
  switchMap,
  map,
  catchError,
  withLatestFrom,
  mergeMap,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectAllPokemons } from './pokemon.selectors';
import { AppState } from '../app.state';
import { PokemonService } from '../../services/pokemon.service';

export const loadPokemons$ = createEffect(
  (
    actions$: Actions = inject(Actions),
    pokemonService: PokemonService = inject(PokemonService)
  ) => {
    console.log('🚀 ~ actions$:', actions$);
    return actions$.pipe(
      ofType(loadPokemons),
      switchMap(() =>
        pokemonService.getPokemons().pipe(
          map((pokemons) => loadPokemonsSuccess({ pokemons })),
          catchError((error) => of(loadPokemonsFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

@Injectable()
export class PokemonEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private pokemonService: PokemonService
  ) {}

  // loadPokemons$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(loadPokemons),
  //     switchMap(() =>
  //       this.pokemonService.getPokemons().pipe(
  //         map((pokemons) => loadPokemonsSuccess({ pokemons })),
  //         catchError((error) => of(loadPokemonsFailure({ error })))
  //       )
  //     )
  //   )
  // );
  loadPokemons$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPokemons),
      switchMap(() => {
        console.log('🚀 ~ PokemonEffects ~ this.store$:', this.store);
        console.log('🚀 ~ PokemonEffects ~ this.actions$:', this.actions$);
        // Call the getPokemons method, convert it to an observable
        return from(this.pokemonService.getPokemons()).pipe(
          // Take the returned value and return a new success action containing the Pokemons
          map((pokemons) => loadPokemonsSuccess({ pokemons: pokemons })),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(loadPokemonsFailure({ error })))
        );
      })
    );
  });

  savePokemons$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(savePokemons),
        withLatestFrom(this.store.select(selectAllPokemons)), // !!! Alert
        switchMap(([action, pokemons]) =>
          from(this.pokemonService.savePokemons(pokemons))
        )
      ),
    { dispatch: false }
  );
}
