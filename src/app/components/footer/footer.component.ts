import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="container">
        <div class="grid">
          <div class="col-12 md:col-4">
            <div class="footer-section">
              <a routerLink="/home"
                ><img src="assets/images/white-bg-logo.png" class="w-8rem"
              /></a>
              <p>
                Creating amazing software solutions with modern technologies and
                innovative design.
              </p>
              <div class="social-links">
                @for (social of socialLinks(); track social.name) {
                  <a [href]="social.link" [title]="social.name" target="_blank">
                    <i [class]="social.icon"></i>
                  </a>
                }
              </div>
            </div>
          </div>
          <div class="col-12 md:col-4">
            <div class="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a routerLink="/home">Home</a></li>
                <li>
                  <a class="cursor-pointer" (click)="scrollTo('pricing')"
                    >Pricing</a
                  >
                </li>
                <!-- <li>
                  <a routerLink="/blog">Blog</a>
                </li> -->
                <li><a routerLink="/policy">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div class="col-12 md:col-4">
            <div class="footer-section">
              <h4>Contact Info</h4>
              <ul class="contact-list">
                <li>
                  <i class="pi pi-map-marker"></i>
                  <span>EG, Maadi</span>
                </li>
                <li>
                  <i class="pi pi-phone"></i>
                  <span>(+2) 0100-7788-368</span>
                </li>
                <li>
                  <i class="pi pi-envelope"></i>
                  <span>hello@8worx.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="m-0 text-sm text-center">
            © Copyright {{ currentYear() }}. All Rights Reserved To
            <a
              href="https://www.8worx.com"
              target="_blank"
              class="no-underline text-primary font-bold"
              >8WORX</a
            >
          </p>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      .footer {
        background: #1a1a1a;
        color: #fff;
        padding: 2rem 0 1rem;
      }

      .footer-section h3 {
        font-size: 1.8rem;
        font-weight: 700;
        background: linear-gradient(135deg, #667eea 0%, #3475d4 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .footer-section h4 {
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: #fff;
      }

      .footer-section p {
        color: #ccc;
        line-height: 1.6;
        margin-bottom: 1.5rem;
      }

      .social-links {
        display: flex;
        gap: 1rem;
      }

      .social-links a {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        text-decoration: none;
        transition: all 0.3s ease;
      }

      .social-links a:hover {
        background: linear-gradient(135deg, #667eea 0%, #3475d4 100%);
        transform: translateY(-3px);
      }

      .footer-section ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .footer-section ul li {
        margin-bottom: 0.75rem;
      }

      .footer-section ul li a {
        color: #ccc;
        text-decoration: none;
        transition: color 0.3s ease;
      }

      .footer-section ul li a:hover {
        color: #3475d4;
      }

      .contact-list li {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        color: #ccc;
      }

      .contact-list li i {
        color: #3475d4;
        margin-top: 0.25rem;
      }

      .footer-bottom {
        text-align: center;
        padding-top: 1rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }

      .footer-bottom p {
        color: #999;
        margin: 0;
      }
    `,
  ],
})
export class FooterComponent {
  currentYear = computed(() => {
    if (typeof Date !== 'undefined') {
      return new Date().getFullYear();
    }
    return 2024;
  });

  socialLinks = signal([
    {
      name: 'Facebook',
      icon: 'pi pi-facebook',
      link: 'https://www.facebook.com/share/1Joajskxm7',
    },
    {
      name: 'LinkedIn',
      icon: 'pi pi-linkedin',
      link: 'https://www.linkedin.com/company/8worx',
    },
    {
      name: 'Instagram',
      icon: 'pi pi-instagram',
      link: 'https://www.instagram.com/8worx?igsh=azJhNzloNWx0dzkx',
    },
  ]);

  scrollTo(section: string) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
