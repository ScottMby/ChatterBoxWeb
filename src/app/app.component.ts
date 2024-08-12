import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponentComponent } from "./register-component/register-component.component";
import { LoginComponentComponent } from "./login-component/login-component.component";
import { AuthService } from './auth-service';
import { User, user } from "@angular/fire/auth"

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegisterComponentComponent, LoginComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.user$.subscribe((user : User) => {
      if(user) {
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
        });
      } else {
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig());
    })
  }

  title = 'chatterboxweb';
}
