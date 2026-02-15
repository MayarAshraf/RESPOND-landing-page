import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';

interface WorkflowStep {
  step: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-steps',
  imports: [CardModule, TimelineModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="how-it-works-section">
      <div class="container">
        <!-- Section Header -->
        <div class="section-title">
          <h2>How 8X RESPOND Works</h2>
        </div>

        <!-- Desktop View - Grid Layout -->
        <div class="desktop-view">
          <div class="steps-grid">
            @for (step of steps; track $index) {
              <div class="step-item">
                <div class="step-card">
                  <!-- Step Number Circle -->
                  <div class="step-number-circle">
                    <span>{{ step.step }}</span>
                  </div>

                  <!-- Step Content -->
                  <div class="step-content">
                    <h3 class="step-title text-center">
                      {{ step.title }}
                    </h3>
                    <p class="step-description">{{ step.description }}</p>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Mobile View - Timeline -->
        <div class="mobile-view">
          <p-timeline [value]="steps" align="alternate">
            <ng-template pTemplate="content" let-step>
              <div class="timeline-card">
                <div class="timeline-step-number hidden md:block">
                  <span>{{ step.step }}</span>
                </div>
                <h3 class="timeline-title">{{ step.title }}</h3>
                <p class="timeline-description">{{ step.description }}</p>
              </div>
            </ng-template>
            <ng-template pTemplate="marker" let-step>
              <div class="custom-marker">
                <span class="text-white font-semibold">{{ step.step }}</span>
              </div>
            </ng-template>
          </p-timeline>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./steps.component.scss'],
})
export class StepsComponent {
  steps: WorkflowStep[] = [
    {
      step: 1,
      title: 'Customer sends a message',
      description:
        'A customer sends a message to your official WhatsApp Business number, with no change to their experience.',
    },
    {
      step: 2,
      title: 'Automatic reply is sent',
      description:
        'The customer instantly receives an automatic reply with a simple menu to select what they need.',
    },
    {
      step: 3,
      title: 'Conversation is routed',
      description:
        "Based on the customer's selection, the conversation is automatically routed to the right team and available agent.",
    },
    {
      step: 4,
      title: 'Agent responds',
      description:
        "An available agent replies from the web dashboard and continues the conversation until it's resolved.",
    },
  ];
}
