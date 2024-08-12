import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponentComponent } from "./register-component/register-component.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegisterComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chatterboxweb';
}
