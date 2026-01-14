import { CustomPageTitleStrategy } from './app/services/custom-page-title.service';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, TitleStrategy } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    {
      provide: TitleStrategy,
      useClass: CustomPageTitleStrategy,
    },
  ],
}).catch((err) => console.error(err));

