import { inject, Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { from, Observable, switchMap } from 'rxjs';
import { DataService } from './data.service';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private storageInitialised = false;
  // private storage: Storage = inject(Storage);
  private dataService: DataService = inject(DataService);

  constructor() {}

  getPokemons(): Observable<Pokemon[]> {
    // if (!this.storageInitialised)  this.storage.create();
    return this.dataService.getPokemons();
    // return ( this.storage.get('pokemons')) || [];
    // return from(this.storage.get('pokemons')).pipe(
    //   switchMap((pokemons) => {
    //     if (!pokemons) {
    //       return this.dataService.getPokemons();
    //     }
    //     // this.storage.create();
    //     return from(pokemons);
    //   })
    // );
  }

  async savePokemons(pokemons: Pokemon[]) {
    // if (!this.storageInitialised) await this.storage.create();

    // return this.storage.set('pokemons', pokemons);
  }
}
