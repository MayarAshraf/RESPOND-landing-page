import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-testimonials',
  imports: [CarouselModule, ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="testimonials" class="testimonials">
      <div class="container">
        <p-carousel
          [value]="testimonials()"
          [numVisible]="1"
          [numScroll]="1"
          [responsiveOptions]="responsiveOptions()"
          [circular]="true"
          [autoplayInterval]="5000"
        >
          <ng-template let-testimonial #item>
            <div class="flex align-items-center gap-4 px-7">
              <img
                src="assets/images/girl.svg"
                class="w-10rem h-10rem"
                alt="Client Photo"
              />
              <div class="text-white">
                <p class="font-light text-3xl">{{ testimonial.text }}</p>
                <div class="mt-4">
                  <span class="font-light text-lg">{{ testimonial.name }}</span>
                  <span class="font-light text-lg">{{
                    testimonial.position
                  }}</span>
                </div>
              </div>
            </div>
          </ng-template>
        </p-carousel>
      </div>
    </section>
  `,
  styles: [
    `
      section {
        padding-block: 50px;
      }
      .testimonials {
        background-color: rgb(26, 188, 156);
      }
      :host {
        ::ng-deep .p-carousel-indicator-button {
          background: #ddd;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin: 30px 4px 0 4px;
        }
        ::ng-deep .p-carousel-indicator-active .p-carousel-indicator-button {
          background: white;
        }
        ::ng-deep .p-icon {
          color: white;
          width: 3rem;
          height: 3rem;
        }
      }

      @media (max-width: 768px) {
        .testimonial-card {
          margin: 0 0.5rem;
          padding: 1.5rem;
        }
      }
    `,
  ],
})
export class TestimonialsComponent {
  responsiveOptions = signal([
    {
      breakpoint: '1024px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1,
    },
  ]);

  testimonials = signal([
    {
      name: 'David Brown',
      position: 'CEO, TechCorp',
      text: 'Working with this team was an absolute pleasure. They delivered exactly what we needed and exceeded',
      icon: 'pi pi-user',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      name: 'Emily Davis',
      position: 'Marketing Director, StartupXYZ',
      text: 'The attention to detail and professionalism shown throughout the project was remarkable.',
      icon: 'pi pi-user',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      name: 'Robert Wilson',
      position: 'Founder, DesignStudio',
      text: "I've worked with many agencies, but this one stands out. They truly understand our vision",
      icon: 'pi pi-user',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    {
      name: 'Lisa Anderson',
      position: 'Product Manager, InnovateCo',
      text: "The team's expertise and dedication are evident in every aspect of the project. We couldn't be happier with the results!",
      icon: 'pi pi-user',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    },
  ]);
}
