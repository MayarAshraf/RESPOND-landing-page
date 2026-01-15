import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  TitleStrategy,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { CustomPageTitleStrategy } from './app/services/custom-page-title.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      routes,
      withRouterConfig({
        onSameUrlNavigation: 'ignore',
        paramsInheritanceStrategy: 'always',
      }),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      })
    ),
    provideAnimations(),
    {
      provide: TitleStrategy,
      useClass: CustomPageTitleStrategy,
    },
  ],
}).catch((err) => console.error(err));
