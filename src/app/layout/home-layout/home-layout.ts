import { Component } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { FaqsComponent } from '../../components/faqs/faqs.component';
import { FeaturesComponent } from '../../components/features/features.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { InfoComponent } from '../../components/info/info.component';
import { PricingComponent } from '../../components/pricing/pricing.component';
import { StepsComponent } from '../../components/steps/steps.component';

@Component({
  selector: 'app-home-layout',
  imports: [
    HeroComponent,
    FeaturesComponent,
    InfoComponent,
    PricingComponent,
    FaqsComponent,
    BannerComponent,
    StepsComponent,
  ],
  templateUrl: './home-layout.html',
  styles: [
    `
      main {
        min-height: 100vh;
      }
    `,
  ],
})
export default class HomeLayout {}
