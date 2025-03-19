import { inject, Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import {
  forkJoin,
  from,
  Observable,
  switchMap,
  map,
  reduce,
  of,
  tap,
  EMPTY,
  take,
} from 'rxjs';
import { DataService } from './data.service';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private dataService: DataService = inject(DataService);
  private storageService: StorageService = inject(StorageService);
  constructor() {}

  getPokemons(): Observable<Pokemon[]> {
    return from(this.storageService.getItem('pokemons')).pipe(
      take(1),
      switchMap((pokemons) => {
        console.log('🚀 ~ PokemonService ~ tap ~ pokemons:', pokemons);
        if (!pokemons) {
          console.log('🚀 ~ PokemonService ~ tap ~ pokemons:', pokemons);
          return this.dataService.getPokemons().pipe(
            switchMap((pokemonsList) => {
              if (!pokemonsList) return from([]);
              if (!pokemonsList.results) return from([]);
              return forkJoin(
                pokemonsList.results.map((pokemon) =>
                  this.dataService.getPokemonByName(pokemon.name)
                )
              ).pipe(
                map((result) => {
                  console.log('Final Object', result);
                  this.storageService.setItem('pokemons', Object.values(result));
                  return Object.values(result);
                })
              );
            })
          );
        }
        return of(pokemons);
      })
    );
    // switchMap((pokemons) => {
    //   if (!pokemons) {
    //     return this.dataService.getPokemons().pipe(
    //       switchMap((pokemonsList) => {
    //         if (!pokemonsList) return from([]);
    //         if (!pokemonsList.results) return from([]);
    //         return forkJoin(
    //           pokemonsList.results.map((pokemon) =>
    //             this.dataService.getPokemonByName(pokemon.name)
    //           )
    //         ).pipe(
    //           map((result) => {
    //             console.log('Final Object', result);
    //             return Object.values(result);
    //           })
    //         );
    //       })
    //     );
    //   }
    //   return (pokemons);
    // })
  }

  async savePokemons(pokemons: Pokemon[]) {
    return await this.storageService.setItem('pokemons', pokemons);
  }
}
