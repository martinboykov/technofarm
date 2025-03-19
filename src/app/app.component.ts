import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { selectAllPokemons } from './state/pokemons/pokemon.selectors';
import { Pokemon } from './models/pokemon.model';
import { loadPokemons } from './state/pokemons/pokemon.actions';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NzPageHeaderModule, NzLayoutModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'technofarm';
  constructor(private store: Store<AppState>) {
    this.store.select<Pokemon[]>(selectAllPokemons).subscribe((state) => {

    });
  }
  ngOnInit() {
    this.store.dispatch(loadPokemons());
  }
}
