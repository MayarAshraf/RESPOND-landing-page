import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-info',
  imports: [CardModule, ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="info" class="info">
      <div class="container">
        <div class="grid align-items-center">
          <div class="col-12 md:col-6">
            <div class="flex flex-column gap-3">
              <h2 class="m-0 text-4xl font-medium">About 8X RESPOND</h2>
              <p class="m-0 subtitle">
                Built for structured team conversations.
              </p>
              <p class="m-0">
                8X RESPOND is a conversation management system that helps teams
                handle business chats in a clear, organized way.
              </p>
              <p class="m-0">
                It enables companies to route conversations automatically,
                assign them to the right teams, and maintain full visibility as
                operations grow.
              </p>
              <p class="m-0">
                8X RESPOND is developed by 8WORX, a technology company focused
                on building practical digital systems for businesses in Egypt
                and the Middle East.
              </p>
            </div>
          </div>
          <div class="col-12 md:col-6">
            <img src="assets/images/about.png" class="w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .subtitle {
        font-size: 28px;
        line-height: 36px;
        font-weight: 300;
        color: #95a5a6;
      }
    `,
  ],
})
export class InfoComponent {}
