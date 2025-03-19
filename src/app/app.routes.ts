import { Routes } from '@angular/router';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';

export const routes: Routes = [
  {
    path: 'home',
    // component: PokemonListComponent,
    loadComponent: () =>
      import('./pages/pokemon-list/pokemon-list.component').then(
        (m) => m.PokemonListComponent
      ),
  },
  {
    path: 'pokemon/:id',
    // component: PokemonComponent,
    loadComponent: () =>
      import('./pages/pokemon/pokemon.component').then(
        (m) => m.PokemonComponent
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
