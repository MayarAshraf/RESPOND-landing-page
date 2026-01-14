import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-features',
  imports: [CommonModule, CardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="features" class="features">
      <div class="container">
        <div class="section-title">
          <h2>Our Features</h2>
          <p>Discover what makes us different and why clients choose us</p>
        </div>
        <div class="grid">
          @for (feature of features(); track feature.title) {
          <div class="col-12 md:col-6 lg:col-3">
            <div
              class="feature-box flex flex-column align-items-center gap-2 h-full"
            >
              <div class="feature-icon main-bg">
                <img [src]="feature.image" />
              </div>
              <div class="feature-content">
                <h3>{{ feature.title }}</h3>
                <p>{{ feature.description }}</p>
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
      .features {
        background: #f8f9fa;
      }

      .feature-box {
        background: white;
        padding: 20px;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 20px rgba(52, 117, 212, 0.08);
        height: 100%;
        position: relative;
        border: 2px solid transparent;
      }

      .feature-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
        width: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #3475d4 0%, #5b9aef 100%);
        box-shadow: 0 4px 15px rgba(52, 117, 212, 0.3);

        img {
          width: 60%;
          height: 60%;
        }
      }

      .feature-content {
        text-align: center;
      }

      .feature-content h3 {
        font-size: 1.1rem;
        font-weight: 600;
        color: #333;
      }

      .feature-content p {
        color: #666;
        font-size: 1rem;
        line-height: 1.6;
      }
    `,
  ],
})
export class FeaturesComponent {
  features = signal([
    {
      image: 'assets/images/whatsapp.svg',
      title: 'One WhatsApp Number',
      description:
        'Handle all conversations using one official WhatsApp Business number across multiple teams and departments easily.',
    },
    {
      image: 'assets/images/robot.svg',
      title: 'Smart Auto Replies',
      description:
        'Send automated WhatsApp templates that guide customers from the first message and reduce response time.',
    },
    {
      image: 'assets/images/conversation.svg',
      title: 'Team Inbox',
      description:
        'Manage all customer conversations together in one shared inbox designed for fast team collaboration.',
    },
    {
      image: 'assets/images/users.svg',
      title: 'Groups & Departments',
      description:
        'Organize agents into clear groups and departments to manage different conversation types efficiently.',
    },
    {
      image: 'assets/images/branch.svg',
      title: 'Smart Routing',
      description:
        'Automatically route conversations to the right agent or group based on department rules and availability.',
    },
    {
      image: 'assets/images/dashboard.svg',
      title: 'Centralized Dashboard',
      description:
        'Control conversations, teams, and performance from one centralized dashboard with full visibility.',
    },
    {
      image: 'assets/images/zap.svg',
      title: 'Easy to Use',
      description:
        'A simple and intuitive interface that teams can start using instantly without training or complexity.',
    },
    {
      image: 'assets/images/language.svg',
      title: 'Arabic & English Interface',
      description:
        'Use the platform comfortably in Arabic or English so every team member works with confidence.',
    },
  ]);
}
