import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { MatNativeDateModule } from '@angular/material/core';
import { routes } from './app.routes';
import { carriageFeature } from './admin-overview/_state/carriage/carriage.reducer';
import { CarriageEffects } from './admin-overview/_state/carriage/carriage.effects';
import { authInterceptor } from './auth/auth.interceptor';
import { searchFeature } from './home/_state/search.reducer';
import { TripEffects } from './home/_state/search.effects';
import { stationFeature } from './admin-overview/_state/station/station.reducer';
import { StationEffects } from './admin-overview/_state/station/station.effects';
import { routeFeature } from './admin-overview/_state/route/route.reducer';
import { RoutesEffects } from './admin-overview/_state/route/route.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    provideStore(),
    provideState(stationFeature),
    provideState(carriageFeature),
    provideState(searchFeature),
    provideEffects([CarriageEffects]),
    provideEffects([TripEffects]),
    provideEffects([StationEffects, CarriageEffects]),
    provideState(routeFeature),
    provideEffects([CarriageEffects, RoutesEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    importProvidersFrom(MatNativeDateModule),
  ],
};
