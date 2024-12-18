/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  onLogin() {
    const loginData = { username: this.username, password: this.password };

    this.http.post('http://localhost:5000/admin/login', loginData)
      .subscribe({
        next: (response: any) => {
          if (response.token) {
            localStorage.setItem('authToken', response.token);
            this.router.navigate(['/admin-dashboard']);
          }
        },
        error: (err) => {
          alert('Invalid credentials, please try again.');
        }
      });
  }
}
