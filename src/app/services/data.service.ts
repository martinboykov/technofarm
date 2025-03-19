import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Pokemon } from '../models/pokemon.model';

const URL = environment.URL;

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private http: HttpClient = inject(HttpClient);
  constructor() {}
  getPokemons() {
    return this.http.get<Pokemon[]>(`${URL}/pokemons?limit=10&offset=0`);
  }
}
