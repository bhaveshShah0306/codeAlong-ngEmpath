import {
  ApplicationConfig,
  inject,
  provideZoneChangeDetection,
  APP_INITIALIZER,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { InitService } from 'src/services/init.service';
import { lastValueFrom } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        const initService = inject(InitService);
        return async () => {
          try {
            await Promise.all([
              lastValueFrom(initService.init()),
              new Promise((resolve) => setTimeout(resolve, 500)),
            ]);
          } finally {
            const splash = document.getElementById('initial-splash');
            if (splash) splash.remove();
          }
        };
      },
      multi: true,
    },
  ],
};
