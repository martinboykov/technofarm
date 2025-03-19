import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { StoreModule, provideStore } from '@ngrx/store';
import { pokemonReducer } from './state/pokemons/pokemon.reducer';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import {
  loadPokemons$,
  PokemonEffects,
} from './state/pokemons/pokemon.effects';


registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    // importProvidersFrom(
    //   IonicModule.forRoot(),
    //   IonicStorageModule.forRoot({ storeName: 'technofarm' })
    // ),
    provideNzI18n(en_US),
    importProvidersFrom(FormsModule),
    // importProvidersFrom(NzIconModule.forRoot()),
    importProvidersFrom(
      StoreModule.forRoot({ pokemons: pokemonReducer }),
      EffectsModule.forRoot([PokemonEffects])
    ),
    // StoreDevtoolsModule.instrument({
    //   maxAge: 25, // Retains last 25 states
    //   logOnly: false, // Restrict extension to log-only mode
    // })
    // provideStore({ pokemons: pokemonReducer }),
    // provideEffects({ effects: [loadPokemons$] }),
  ],
};
