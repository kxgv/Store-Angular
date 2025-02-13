import { Component, inject, OnDestroy, OnInit, Inject, Renderer2 } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatternValidators } from '../../../shared/validators/pattern-validators';
import { AppStrings } from '../../../shared/app.strings';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit, OnDestroy{

  emailFormatNotValid = AppStrings.emailFormatNotValid;
  
  loginForm!: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;


  submitted = false;

  error: string = '';

  get fc() {
    return this.loginForm.controls;
  }
  
  authService = inject(AuthService);

  constructor(
    private router: Router, 
    private renderer: Renderer2, 
    @Inject(DOCUMENT) private document: Document) { }

  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.documentElement, 'login-page');
  }

  ngOnInit(): void {
    this.renderer.addClass(this.document.documentElement, 'login-page');
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = new FormGroup<{
      email: FormControl<string | null>;
      password: FormControl<string | null>;
    }>({
      email: new FormControl<string | null>(null, [
        Validators.required,
        Validators.pattern(PatternValidators.emailPattern),
      ]),
      password: new FormControl<string | null>(null, Validators.required),
    });
  }

  login() {
    const email = this.fc.email.value;
    const password = this.fc.password.value;

    if (email && password) {
      this.submitted = true;
      this.authService.login(email, password).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: () => (this.error = 'Bad credentials'),
      });
    } else {
      this.error = 'Please fill in all fields.';
    }
  }

}