import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  TitleStrategy,
  withComponentInputBinding,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { Preset } from './app/app-theme';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { CustomPageTitleStrategy } from './app/services/custom-page-title.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      routes,
      withViewTransitions(),
      withComponentInputBinding(),
      withRouterConfig({
        onSameUrlNavigation: 'ignore',
        paramsInheritanceStrategy: 'always',
      }),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideAnimations(),
    {
      provide: TitleStrategy,
      useClass: CustomPageTitleStrategy,
    },
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Preset,
      },
    }),
  ],
}).catch((err) => console.error(err));
