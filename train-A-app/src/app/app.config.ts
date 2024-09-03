import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
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
import { searchFeature, tripFeature } from './home/_state/search.reducer';
import { TripEffects } from './home/_state/search.effects';
import { rolesReducer } from './auth/_state/roles.reducer';
import { stationFeature } from './admin-overview/_state/station/station.reducer';
import { StationEffects } from './admin-overview/_state/station/station.effects';
import { routeFeature } from './admin-overview/_state/route/route.reducer';
import { RoutesEffects } from './admin-overview/_state/route/route.effects';
import { RideEffects } from './admin-overview/_state/ride/ride.effects';
import { rideFeature } from './admin-overview/_state/ride/ride.reducer';
import { userProfileFeature } from './user-profile/_state/user-profile.reducer';
import { UserProfileEffects } from './user-profile/_state/user-profile.effects';
import { orderFeature } from './orders/_state/order/order.reducer';
import { userFeature } from './orders/_state/user/user.reducer';
import { OrderEffects } from './orders/_state/order/order.effets';
import { UserEffects } from './orders/_state/user/user.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    provideStore(),
    provideStore({ roleState: rolesReducer.reducer }),
    provideState(stationFeature),
    provideState(carriageFeature),
    provideState(rideFeature),
    provideState(tripFeature),
    provideState(routeFeature),
    provideState(userProfileFeature),
    provideState(searchFeature),
    provideState(routeFeature),
    provideState(orderFeature),
    provideState(userFeature),
    provideEffects([
      StationEffects,
      TripEffects,
      CarriageEffects,
      RoutesEffects,
      UserProfileEffects,
      RideEffects,
      OrderEffects,
      UserEffects,
    ]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    importProvidersFrom(MatNativeDateModule),
  ],
};
