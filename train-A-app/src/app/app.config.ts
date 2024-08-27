import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { carriageFeature } from './admin-overview/_state/carriage/carriage.reducer';
import { CarriageEffects } from './admin-overview/_state/carriage/carriage.effects';
import { authInterceptor } from './auth/auth.interceptor';
import { stationFeature } from './admin-overview/_state/station/station.reducer';
import { StationEffects } from './admin-overview/_state/station/station.effects';
import { RoutesEffects } from './admin-overview/_state/route/route.effects';
import { routeFeature } from './admin-overview/_state/route/route.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    provideStore(),
    provideState(stationFeature),
    provideState(carriageFeature),
    provideEffects([StationEffects, CarriageEffects]),
    provideState(routeFeature),
    provideEffects([CarriageEffects, RoutesEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
