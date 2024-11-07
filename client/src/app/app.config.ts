import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { PreloadService } from './shared/services/preload.service';
import { UserDataRepository } from '@repository/user-data.repository';

export function preloadAppInitializer(preloadService: PreloadService) {
  return () => preloadService;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(),

    PreloadService,
    UserDataRepository,
    {
      provide: APP_INITIALIZER,
      useFactory: preloadAppInitializer,
      deps: [PreloadService],
      multi: true,
    }
  ]
};
