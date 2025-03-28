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
import { IconDefinition } from '@ant-design/icons-angular';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { pokemonReducer } from './state/pokemons/pokemon.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PokemonEffects } from './state/pokemons/pokemon.effects';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  ArrowLeftOutline,
  FormOutline,
  SaveOutline,
} from '@ant-design/icons-angular/icons';
import { IonicStorageModule } from '@ionic/storage-angular';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
const icons: IconDefinition[] = [FormOutline, ArrowLeftOutline, SaveOutline];

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    importProvidersFrom(
      IonicStorageModule.forRoot({ storeName: 'technofarm' })
    ),
    provideNzI18n(en_US),
    importProvidersFrom(FormsModule),
    importProvidersFrom(NzIconModule.forRoot(icons)),
    importProvidersFrom(
      StoreModule.forRoot({ pokemons: pokemonReducer }),
      EffectsModule.forRoot([PokemonEffects]),
      StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
        logOnly: environment.production, // Restrict extension to log-only mode
      })
    ),
  ],
};
