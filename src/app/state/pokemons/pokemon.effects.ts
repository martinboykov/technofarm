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
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectAllPokemons } from './pokemon.selectors';
import { AppState } from '../app.state';
import { PokemonService } from '../../services/pokemon.service';

@Injectable()
export class PokemonEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private pokemonService: PokemonService
  ) {}

  loadPokemons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPokemons),
      switchMap(() =>
        from(this.pokemonService.getPokemons()).pipe(
          map((pokemons) => loadPokemonsSuccess({ pokemons: pokemons })),
          catchError((error) => of(loadPokemonsFailure({ error })))
        )
      )
    )
  );

  savePokemons$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(savePokemons),
        withLatestFrom(this.store.select(selectAllPokemons)),
        switchMap(async ([action, pokemons]) =>
          this.pokemonService.savePokemons(pokemons)
        )
      ),
    { dispatch: false }
  );
}
