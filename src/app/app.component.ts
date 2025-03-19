import { Component, DestroyRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { selectAllPokemons } from './state/pokemons/pokemon.selectors';
import { Pokemon } from './models/pokemon.model';
import { loadPokemons } from './state/pokemons/pokemon.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NzPageHeaderModule, NzLayoutModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private destroyedRef = inject(DestroyRef);
  constructor(private store: Store<AppState>) {
    this.store
      .select<Pokemon[]>(selectAllPokemons)
      .pipe(takeUntilDestroyed(this.destroyedRef))
      .subscribe();
  }
  ngOnInit() {
    this.store.dispatch(loadPokemons());
  }
}
