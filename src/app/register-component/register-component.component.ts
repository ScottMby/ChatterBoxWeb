import { Component, inject } from '@angular/core';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-component.component.html',
  styleUrl: './register-component.component.css'
})
export class RegisterComponentComponent {
  authService = inject(AuthService);
  router = inject(Router);

  registerForm = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  })

  errorMessage: string | null = null;
  register()
  {
    this.authService.register(this.registerForm.value.email ?? '', this.registerForm.value.username ?? '', this.registerForm.value.password ?? '')
    .subscribe(
      res => this.router.navigateByUrl('/'),
      err => this.errorMessage = err.code
    );
    this.authService.registerApi();
  }
}
