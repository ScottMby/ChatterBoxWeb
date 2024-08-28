import { Component, inject } from '@angular/core';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api-service';
import { Observable } from 'rxjs';

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
  apiService = inject(ApiService);

  registerForm = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  })

  errorMessage: string | null = null;
  register()
  {
    //Register with Firebase Auth
    this.authService.register(this.registerForm.value.email ?? '', this.registerForm.value.username ?? '', this.registerForm.value.password ?? '')
    .subscribe(
      res => this.router.navigateByUrl('/'),
      err => this.errorMessage = err.code
    );
    //Send new user details to Chatterbox API
    this.apiService.authorizedPostRequest(null, "https://localhost:7078/user/register").subscribe(
      (response) => {
        console.log('Success:', response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
