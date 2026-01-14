import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-pricing',
  imports: [CommonModule, CardModule, ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="pricing" class="pricing">
      <div class="container">
        <div class="section-title mb-7">
          <h2>Pricing Plans</h2>
          <p>Choose the perfect plan for your needs</p>
        </div>
        <div class="grid">
          @for (plan of pricingPlans(); track plan.name) {
          <div class="col-12 md:col-6 lg:col-4">
            <div class="card h-full flex flex-column justify-content-between">
              <div
                class="pricing-header"
                [class]="
                  plan.name === 'Professional' ? 'bg-pro -mt-4' : 'bg-main'
                "
              >
                <div
                  class="text-2xl"
                  [class]="plan.name === 'Professional' ? 'p-3' : 'p-1'"
                >
                  {{ plan.name }}
                </div>
                <div
                  class="pricing-price text-5xl font-meduim"
                  [class]="
                    plan.name === 'Professional' ? 'bg-pro-400' : 'bg-main-400'
                  "
                >
                  <span class="currency">$</span>
                  <span class="amount">{{ plan.price }}</span>
                </div>
                <div class="text-xl p-2">{{ plan.description }}</div>
              </div>
              <div class="pricing-features">
                <ul class="pricing-list m-0 p-0 list-none text-center">
                  @for (feature of plan.features; track feature) {
                  <li>
                    {{ feature }}
                  </li>
                  }
                </ul>
              </div>
              <div
                class="text-center p-4 mt-auto"
                [class]="plan.name === 'Professional' ? 'bg-pro' : 'bg-main'"
              >
                <button
                  pButton
                  [label]="plan.buttonText"
                  class="p-3 text-white uppercase border-round-sm"
                  [class]="
                    plan.name === 'Professional' ? 'bg-pro-400' : 'bg-main-400'
                  "
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
  pricingPlans = signal([
    {
      name: 'Starter',
      price: '29',
      description: 'Perfect for small projects',
      features: [
        'Up to 5 pages',
        'Responsive design',
        'Basic support',
        '1 month free updates',
        'Email support',
      ],
      buttonText: 'Get Started',
      featured: false,
    },
    {
      name: 'Professional',
      price: '79',
      description: 'Best for growing businesses',
      features: [
        'Unlimited pages',
        'Premium design',
        'Priority support',
        '6 months free updates',
        'Email & phone support',
        'Custom features',
        'SEO optimization',
      ],
      buttonText: 'Get Started',
      featured: true,
    },
    {
      name: 'Enterprise',
      price: '199',
      description: 'For large organizations',
      features: [
        'Unlimited everything',
        'Custom design',
        '24/7 support',
        'Lifetime updates',
        'Dedicated manager',
        'Advanced features',
        'Performance optimization',
        'Security audit',
      ],
      buttonText: 'Contact Us',
      featured: false,
    },
  ]);
}
