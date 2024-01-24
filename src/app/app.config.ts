import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { LoaderInterceptor } from './core/interceptor/loader-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide:HTTP_INTERCEPTORS, useClass:LoaderInterceptor, multi:true },
    provideRouter(routes), 
    provideAnimations(),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptors([])),
  ]
};
