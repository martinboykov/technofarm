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
    return this.http.get<PokemonListResponse>(
      `${URL}/pokemon?limit=10&offset=0`
    );
  }
  getPokemonByName(name: string) {
    return this.http.get<Pokemon>(`${URL}/pokemon/${name}`);
  }
}
