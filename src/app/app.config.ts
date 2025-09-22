import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter,withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes,
          withEnabledBlockingInitialNavigation(),   // 👈 makes sure first navigation works correctly
      withInMemoryScrolling({                   // 👈 handles scroll restoration
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
      })
    ),provideHttpClient()
  ]
};
