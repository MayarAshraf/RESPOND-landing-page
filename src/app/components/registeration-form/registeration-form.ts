import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { SelectModule } from 'primeng/select';
import { StepperModule } from 'primeng/stepper';
import { ToastModule } from 'primeng/toast';
import { catchError, debounceTime, finalize, map, of, switchMap } from 'rxjs';
import { ApiService } from '../../services/api.service';

interface DomainSuggestion {
  subdomain: string;
  full_domain: string;
}

@Component({
  selector: 'app-registeration-form',
  imports: [
    StepperModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    SelectModule,
    AsyncPipe,
    KeyFilterModule,
    MessageModule,
    ToastModule,
  ],
  templateUrl: './registeration-form.html',
  styleUrl: './registeration-form.scss',
  providers: [MessageService],
})
export default class RegisterationForm {
  #fb = inject(FormBuilder);
  #api = inject(ApiService);
  #destroyRef = inject(DestroyRef);
  messageService = inject(MessageService);

  form!: FormGroup;
  formVisible = input(false);
  packageId = input(0);

  activeStep = signal(1);
  loading = signal(false);
  domainAvailable = signal<boolean | null>(null);
  domainSuggestions = signal<DomainSuggestion[]>([]);
  checkingDomain = signal(false);

  countryCodes$ = this.#api.request('get', 'countries/dial-codes').pipe(
    map(({ data }) =>
      data.map((item: any) => ({
        label: `${item.label} (${item.value})`,
        value: item.value,
      })),
    ),
  );

  ngOnInit() {
    this.form = this.#fb.group(
      {
        package_id: [this.packageId()],
        first_name: ['', [Validators.required, Validators.minLength(2)]],
        last_name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        password_confirmation: ['', Validators.required],
        phone: ['', Validators.required],
        country_code: ['eg', Validators.required],
        company_name: ['', [Validators.required, Validators.minLength(2)]],
        subdomain: [
          '',
          [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)],
          [this.domainAvailabilityValidator()],
        ],
      },
      { validators: this.passwordMatchValidator },
    );
  }

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirm = form.get('password_confirmation')?.value;

    if (!password || !confirm) return null;

    return password === confirm ? null : { passwordMismatch: true };
  }

  domainAvailabilityValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      const subdomain = control.value;
      const company = this.form?.get('company_name')?.value;

      if (!subdomain) {
        this.domainAvailable.set(null);
        this.domainSuggestions.set([]);
        return of(null);
      }

      if (!company) {
        this.domainAvailable.set(null);
        this.domainSuggestions.set([]);
        return of(null);
      }

      if (!/^[a-z0-9-]+$/.test(subdomain)) {
        this.domainAvailable.set(null);
        this.domainSuggestions.set([]);
        return of(null);
      }

      this.checkingDomain.set(true);
      this.domainAvailable.set(null);

      return of(null).pipe(
        debounceTime(500),
        switchMap(() =>
          this.#api.request('post', 'check-subdomain', {
            subdomain,
            company_name: company,
          }),
        ),
        map(({ data }) => {
          this.domainAvailable.set(data.available);
          this.domainSuggestions.set(data.suggestions ?? []);
          this.checkingDomain.set(false);

          return data.available ? null : { domainTaken: true };
        }),
        catchError((error) => {
          this.checkingDomain.set(false);
          this.domainAvailable.set(null);
          console.error('Domain check error:', error);
          return of(null);
        }),
      );
    };
  }

  get contactFormControl() {
    return this.form.controls;
  }

  isInvalid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!(control?.invalid && control.touched);
  }

  getErrorMessage(fieldName: string): string {
    const control = this.form.get(fieldName);
    if (!control?.errors || !control.touched) return '';

    const formattedFieldName = this.formatFieldName(fieldName);

    if (control.errors['required']) return `${formattedFieldName} is required`;
    if (control.errors['email']) return 'Invalid email address';
    if (control.errors['minlength'])
      return `Minimum ${control.errors['minlength'].requiredLength} characters required`;
    if (control.errors['pattern']) {
      if (fieldName === 'subdomain')
        return 'Only lowercase letters, numbers, and hyphens allowed';
    }
    if (control.errors['domainTaken']) return 'Domain is not available';

    return 'Invalid input';
  }

  formatFieldName(fieldName: string): string {
    return fieldName
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  isStep1Valid(): boolean {
    const step1Fields = [
      'first_name',
      'last_name',
      'email',
      'password',
      'password_confirmation',
      'phone',
      'country_code',
      'company_name',
    ];

    const allValid = step1Fields.every((field) => this.form.get(field)?.valid);
    const passwordsMatch = !this.form.errors?.['passwordMismatch'];

    return allValid && passwordsMatch;
  }

  get canProceedToStep2(): boolean {
    return this.isStep1Valid();
  }

  goToStep2() {
    const step1Fields = [
      'first_name',
      'last_name',
      'email',
      'password',
      'password_confirmation',
      'phone',
      'country_code',
      'company_name',
    ];

    step1Fields.forEach((field) => this.form.get(field)?.markAsTouched());

    if (this.isStep1Valid()) {
      this.activeStep.set(2);
    }
  }

  selectSuggestion(suggestion: DomainSuggestion) {
    this.form.get('subdomain')?.setValue(suggestion.subdomain);
  }

  onSubmit() {
    const subdomainControl = this.form.get('subdomain');
    subdomainControl?.markAsTouched();

    if (this.form.invalid || this.domainAvailable() !== true) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    this.#api
      .request('post', 'register', this.form.value)
      .pipe(
        finalize(() => this.loading.set(false)),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe({
        next: () => {
          this.activeStep.set(3);
        },
        error: (error) => {
          const errors = error.error.errors;
          const errorMessage = Object.values(errors).flat().join(', ');
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: errorMessage,
          });
        },
      });
  }
}
