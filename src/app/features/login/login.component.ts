import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  onSubmit(): void {
    if (this.username && this.password) {
      console.log('Login attempt:', { username: this.username, password: this.password });
      // Add logic to handle login, such as calling an authentication API
      alert(`Welcome, ${this.username}!`);
    } else {
      console.error('Both fields are required.');
      alert('Please enter both username and password.');
    }
  }
}
