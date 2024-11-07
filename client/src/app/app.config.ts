import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { PreloadService } from './shared/services/preload.service';
import { UserDataRepository } from '@repository/user-data.repository';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export function preloadAppInitializer(preloadService: PreloadService) {
  return () => preloadService;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(),

    provideAnimations(),
    BrowserAnimationsModule,

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
