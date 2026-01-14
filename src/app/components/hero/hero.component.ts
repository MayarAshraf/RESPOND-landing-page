import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-hero',
  imports: [ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="home" class="hero">
      <div class="hero-background"></div>
      <div class="container">
        <div class="hero-content fade-in-up">
          <h1 class="hero-title">
            Customers message. Teams handle replies. Conversations get messy.
            Can you manage it all?
          </h1>
          <p class="hero-description">
            Manage WhatsApp conversations, automate replies, route customers to
            the right agent, and scale your support. All from one smart
            dashboard.
          </p>
          <div class="hero-buttons">
            <button
              pButton
              label="Get Started"
              class="btn-primary"
              (click)="scrollTo('features')"
            ></button>
            <button
              pButton
              label="Learn More"
              class="btn-secondary"
              (click)="scrollTo('info')"
            ></button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        position: relative;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: start;
        padding-top: 80px;
        overflow: hidden;
        background-image: url('/assets/images/hero.png');
        background-size: cover;
        background-repeat: no-repeat;
        background-attachment: fixed;
        z-index: 1;
      }

      .hero-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.55);
        backdrop-filter: blur(3px);
        z-index: -1;
      }

      .btn-primary {
        background: #3475d4;
        border: none;
        color: white;
        padding: 16px 24px;
        border-radius: 6px;
        font-weight: 500;
        cursor: pointer;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .btn-primary:hover {
        background: #2d67beff !important;
        color: white;
      }

      .btn-secondary {
        background: #ffffff;
        border: 1px solid #3475d4;
        color: #3475d4;
        padding: 16px 24px;
        border-radius: 6px;
        font-weight: 500;
        cursor: pointer;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .btn-secondary:hover {
        border: 2px solid #3475d4;
        background: #3475d4 !important;
        color: #ffffff;
      }

      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .hero-content {
        max-width: 900px;
        padding: 2rem;
        color: white;
        padding-top: 70px;
      }

      .hero-title {
        font-size: 2.4rem;
        font-weight: 700;
        color: white;
        margin-bottom: 1rem;
        line-height: 1.2;
      }

      .gradient-text {
        background: linear-gradient(135deg, #667eea 0%, #9b7eb8ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .hero-subtitle {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        font-weight: 600;
      }

      .hero-description {
        font-weight: 300;
        font-size: 1.4rem;
        margin-bottom: 2rem;
        line-height: 1.8;
      }

      .hero-buttons {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }

      @media (max-width: 768px) {
        .hero-title {
          font-size: 2rem;
        }

        .hero-subtitle {
          font-size: 1.2rem;
        }

        .hero-description {
          font-size: 1rem;
        }

        .hero-buttons {
          flex-direction: column;
          align-items: center;
        }

        .hero-buttons button {
          width: 100%;
          max-width: 300px;
        }
      }
    `,
  ],
})
export class HeroComponent {
  scrollTo(section: string) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
