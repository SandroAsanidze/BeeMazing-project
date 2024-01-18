import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimations(),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptors([])),
  ]
};
