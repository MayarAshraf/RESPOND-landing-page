import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.scrolled]': 'isScrolled()',
  },
  template: `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <a routerLink="/home"
              ><img src="assets/images/white-logo.png" class="w-8rem"
            /></a>
          </div>
          <nav [class.active]="menuOpen()" class="nav">
            <a routerLink="/home">Home</a>
            <a class="cursor-pointer" (click)="scrollTo('features')"
              >Features</a
            >
            <a class="cursor-pointer" (click)="scrollTo('pricing')">Pricing</a>
            <!-- <a class="cursor-pointer" routerLink="/blog">Blog</a> -->
            <a class="cursor-pointer" (click)="scrollTo('contact')">Contact</a>
          </nav>
          <button
            class="menu-toggle"
            (click)="toggleMenu()"
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [
    `
      .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        background: white;
        backdrop-filter: blur(10px);
        border-bottom: solid 1px #ecf0f1;
        transition: all 0.3s ease;
      }

      .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.7rem 0;
      }

      .nav {
        display: flex;
        gap: 3rem;
        align-items: center;
      }

      .nav a {
        color: #34495e;
        text-decoration: none;
        font-weight: 700;
        font-size: 1rem;
        position: relative;
        transition: color 0.3s ease;
      }

      .nav a::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 0;
        height: 2px;
        background: #3475d4;
        transition: width 0.3s ease;
      }

      .nav a:hover {
        color: #3475d4;
      }

      .nav a:hover::after {
        width: 100%;
      }

      .menu-toggle {
        display: none;
        flex-direction: column;
        background: none;
        border: none;
        cursor: pointer;
        padding: 5px;
        gap: 5px;
      }

      .menu-toggle span {
        width: 25px;
        height: 3px;
        background: #333;
        border-radius: 3px;
        transition: all 0.3s ease;
      }

      @media (max-width: 768px) {
        .menu-toggle {
          display: flex;
        }

        .nav {
          position: fixed;
          top: 70px;
          left: 0;
          right: 0;
          background: white;
          flex-direction: column;
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transform: translateX(-100%);
          transition: transform 0.3s ease;
          gap: 1.5rem;
        }

        .nav.active {
          transform: translateX(0);
        }

        .nav a {
          font-size: 1.1rem;
        }
      }
    `,
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isScrolled = signal(false);
  menuOpen = signal(false);
  private handleScroll?: () => void;

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.handleScroll = () => {
        this.isScrolled.set(window.scrollY > 50);
      };
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined' && this.handleScroll) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  toggleMenu() {
    this.menuOpen.update((value) => !value);
  }

  scrollTo(section: string) {
    this.menuOpen.set(false);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
