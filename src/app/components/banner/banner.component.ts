import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="banner" class="banner">
      <div class="container">
        <div class="flex flex-column align-items-center justify-content-center">
          <div class="icon">
            <img src="assets/images/branch.svg" />
          </div>
          <div class="content text-center text-white">
            <h2 class="m-0 text-4xl font-medium">Smart Chat Flow Builder</h2>
            <p class="text-2xl">
              Create custom automation rules that control how conversations are
              routed and assigned, Matching how your team actually works.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      section {
        padding-block: 50px;
      }
      .banner {
        background: linear-gradient(135deg, #5a6bdc 0%, #2f68c8 100%);
      }
      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
        width: 60px;
        border-radius: 12px;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .content h3 {
        font-size: 2rem;
        font-weight: 600;
      }

      .content p {
        color: rgba(255, 255, 255, 0.8);
      }
    `,
  ],
})
export class BannerComponent {}
