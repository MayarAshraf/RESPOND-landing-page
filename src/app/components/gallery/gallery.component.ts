import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, CardModule, TagModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="gallery" class="gallery">
      <div class="container">
        <div class="section-title">
          <h2>Our Gallery</h2>
          <p>Take a look at some of our recent work and projects</p>
        </div>
        <div class="grid">
          @for (project of projects(); track $index) {
          <div class="col-12 md:col-6 lg:col-3">
            <div class="gallery-image relative">
              <img [src]="project.image" class="w-full h-12rem" />
              <div class="image-content">
                <span class="text-lg font-semibold">View Details</span>
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
      .gallery {
        background: white;

        .gallery-image {
          cursor: pointer;
          overflow: hidden;

          img {
            transition: transform 0.3s ease;
          }

          .image-content {
            position: absolute;
            width: 100%;
            text-align: center;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -20%);
            background: rgba(255, 255, 255, 0.6);
            padding: 0.5rem 1rem;
            opacity: 0;
            transition-delay: 0.05s;
            transition: opacity 0.3s ease, transform 0.3s ease;
          }

          &:hover {
            img {
              transform: scale(0.96);
            }

            .image-content {
              opacity: 1;
              transform: translate(-50%, -50%);
            }
          }
        }
      }
    `,
  ],
})
export class GalleryComponent {
  projects = signal([
    {
      image: 'assets/images/gallery1.png',
    },
    {
      image: 'assets/images/gallery2.png',
    },
    {
      image: 'assets/images/gallery3.png',
    },
    {
      image: 'assets/images/gallery4.png',
    },
    {
      image: 'assets/images/gallery1.png',
    },
    {
      image: 'assets/images/gallery2.png',
    },
    {
      image: 'assets/images/gallery3.png',
    },
    {
      image: 'assets/images/gallery4.png',
    },
  ]);
}
