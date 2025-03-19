import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { from, Observable } from 'rxjs';

const URL = environment.URL;
export interface PokemonListResponse {
  count: number;
  next: string;
  previous: null;
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
}
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private http: HttpClient = inject(HttpClient);
  constructor() {}
  getPokemons() {
    // const data$ = Observable.create((observer: {name: string, url: string}[]) => {
    //   fetch(`${URL}/pokemon?limit=10&offset=0`)
    //     .then(response => response.json()) // or text() or blob() etc.
    //     .then(data => {
    //       observer.next(data);
    //       observer.complete();
    //     })
    //     .catch(err => observer.error(err));
    // });
    // // return this.http.get<Pokemon[]>(`${URL}/pokemons?limit=10&offset=0`);
    // return data$;
    // fetch("https://pokeapi.co/api/v2/pokemon/28/").then(results => { return results.json();
    // }).then(data => {
    //     console.log(data);
    // })
    return this.http.get<PokemonListResponse>(
      `${URL}/pokemon?limit=10&offset=0`
    );
  }
  getPokemonByName(name: string) {
    return this.http.get<Pokemon>(`${URL}/pokemon/${name}`);
  }
}
