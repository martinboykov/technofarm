import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { RouterLink } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { Store } from '@ngrx/store';
import { Pokemon } from '../../models/pokemon.model';
import { selectAllPokemons } from '../../state/pokemons/pokemon.selectors';
import { AppState } from '../../state/app.state';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    CommonModule,
    NzListModule,
    NzLayoutModule,
    RouterLink,
    NzGridModule,
    NzSkeletonModule,
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent {
  loading$: Observable<boolean> = this.store.select(
    (state) => state.pokemons.isLoading
  );
  pokemons$: Observable<Pokemon[]> = this.store.select(selectAllPokemons);

  constructor(private store: Store<AppState>) {}
}
