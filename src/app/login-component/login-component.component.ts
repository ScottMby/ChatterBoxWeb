import { Component, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AuthService } from '../auth-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css'
})
export class LoginComponentComponent {
  authService = inject(AuthService);
  router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  errorMessage: string | null = null;
  login()
  {
    this.authService.login(this.loginForm.value.email ?? '', this.loginForm.value.password ?? '')
    .subscribe(
      res => this.router.navigateByUrl('/'),
      err => this.errorMessage = err.code
    );
  }
}
