import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-faqs',
  imports: [
    AccordionModule,
    ButtonModule,
    ReactiveFormsModule,
    TextareaModule,
    InputTextModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contact" class="faqs">
      <div class="container">
        <div class="section-title">
          <h2>F.A.Q.</h2>
          <p>
            You have a question? Someone else might have the exact same one.
            Let's find out!
          </p>
        </div>
        <div class="grid">
          <div class="col-12 lg:col-6">
            <p-accordion
              [value]="0"
              transitionOptions="50ms ease"
              class="faqs-accordion"
            >
              @for (tab of tabs; track tab.title) {
              <p-accordion-panel [value]="tab.value">
                <p-accordion-header>{{ tab.title }}</p-accordion-header>
                <p-accordion-content>
                  <p class="m-0">{{ tab.content }}</p>
                </p-accordion-content>
              </p-accordion-panel>
              }
            </p-accordion>
            <div class="contact mt-1">
              <p class="text-2xl">Our Contact Details</p>

              <div class="grid mt-2">
                <div class="col-12 md:col-4">
                  <strong>Address</strong>
                </div>
                <div class="col-12 md:col-8">EG, Maadi</div>
                <div class="col-12 md:col-4">
                  <strong>UAE</strong>
                </div>
                <div class="col-12 md:col-8">(+971) 50 403 5209</div>
                <div class="col-12 md:col-4">
                  <strong>Egypt</strong>
                </div>
                <div class="col-12 md:col-8">(+2) 0100-7788-368</div>
                <div class="col-12 md:col-4">
                  <strong>Email</strong>
                </div>
                <div class="col-12 md:col-8">hello@8worx.com</div>
              </div>
            </div>
          </div>
          <div class="col-12 lg:col-6">
            <div class="flex align-items-center gap-4">
              <img
                src="assets/images/contact.jpg"
                alt="FAQs Image"
                class=" w-7rem h-7rem img-cover"
              />
              <p class="text-3xl font-light">
                Didn't find what you were looking for? Contact us!
              </p>
            </div>
            <form
              [formGroup]="contactForm"
              (ngSubmit)="onSubmit()"
              class="mt-3"
            >
              <div class="field mb-3">
                <input
                  type="text"
                  pInputText
                  formControlName="name"
                  placeholder="Your name..."
                  class="w-full"
                />
              </div>

              <div class="field mb-3">
                <input
                  type="email"
                  pInputText
                  formControlName="email"
                  placeholder="Your e-mail address..."
                  class="w-full"
                />
              </div>

              <div class="field mb-3">
                <textarea
                  pInputTextarea
                  formControlName="message"
                  placeholder="Your message..."
                  rows="5"
                  cols="30"
                  class="w-full"
                ></textarea>
              </div>

              <div class="field">
                <button
                  pButton
                  type="submit"
                  label="Send"
                  class="btn-primary w-full p-button-lg"
                  [disabled]="!contactForm.valid"
                ></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './faqs.component.scss',
})
export class FaqsComponent {
  tabs = [
    {
      title: 'Is 8X RESPOND only for customer support?',
      content: 'No. It can be used by variant departments.',
      value: '0',
    },
    {
      title: 'Do customers need to install anything?',
      content: 'No. Customers continue chatting through WhatsApp as usual.',
      value: '1',
    },
    {
      title: 'Is the system difficult to set up?',
      content: 'No. It’s designed to be easy to use with simple setup.',
      value: '2',
    },
    {
      title: 'What kind of support do we get?',
      content:
        'Local support from a real team that understands how your business works.',
      value: '3',
    },
  ];

  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      // Handle form submission here
      // You can add your API call or further processing
      this.contactForm.reset();
    }
  }
}
