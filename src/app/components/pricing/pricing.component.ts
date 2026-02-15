import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { map } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-pricing',
  imports: [CardModule, ButtonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="pricing" class="pricing">
      <div class="container">
        <div class="section-title mb-7">
          <h2>Pricing Plans</h2>
          <p>Choose the perfect plan for your needs</p>
        </div>
        <div class="grid">
          @for (package of packages(); track package.id) {
            <div class="col-12 md:col-6 lg:col-4">
              <div class="card h-full flex flex-column justify-content-between">
                <div
                  class="pricing-header"
                  [class]="package.is_featured ? 'bg-pro -mt-4' : 'bg-main'"
                >
                  <div
                    class="text-2xl"
                    [class]="package.is_featured ? 'p-3' : 'p-1'"
                  >
                    {{ package.name_en }}
                  </div>
                  <div
                    class="pricing-price text-5xl font-meduim"
                    [class]="package.is_featured ? 'bg-pro-400' : 'bg-main-400'"
                  >
                    <span class="currency">$</span>
                    <span class="amount">{{ package.price }}</span>
                  </div>
                  <div class="text-xl p-2">{{ package.description }}</div>
                </div>
                <div class="pricing-features">
                  <ul class="pricing-list m-0 p-0 list-none text-center">
                    @for (feature of package.features; track feature) {
                      <li>
                        {{ feature }}
                      </li>
                    }
                  </ul>
                </div>
                <div
                  class="text-center p-4 mt-auto"
                  [class]="package.is_featured ? 'bg-pro' : 'bg-main'"
                >
                  <button
                    pButton
                    label="Subscribe"
                    class="p-3 text-white uppercase border-round-sm border-none"
                    [class]="package.is_featured ? 'bg-pro-400' : 'bg-main-400'"
                    routerLink="/registeration/{{ package.id }}"
                  ></button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .bg-main {
        background-color: #8a898f;
      }
      .bg-main-400 {
        background-color: #7e7e83;
      }
      .bg-pro {
        background-color: #3475d4;
      }
      .bg-pro-400 {
        background-color: #2d67beff;
      }

      .pricing {
        background: #f8f9fa;
      }

      .card {
        box-shadow: 0 4px 20px rgba(52, 117, 212, 0.08);
      }

      .pricing-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        color: #ffffff;
        padding-block: 1rem;

        .pricing-price {
          width: 100%;
          padding: 1rem;
          text-align: center;
        }
      }

      .pricing-list {
        li {
          font-size: 18px;
          line-height: 48px;
          color: #7f8c8d;
          padding: 12px 0;

          &:nth-child(even) {
            background-color: #f5f7f7;
          }
        }
      }
    `,
  ],
})
export class PricingComponent {
  #api = inject(ApiService);

  packages$ = this.#api
    .request('post', 'package/paginated-package')
    .pipe(map(({ data }) => data.data));

  packages = toSignal(this.packages$, {
    initialValue: null,
  });
}
