import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  rememberMe: boolean=false;

  constructor(private authService: AuthService, private storageService: StorageService) {
    const storedRememberMe = localStorage.getItem('rememberMe');
    if (storedRememberMe !== null) {
      this.rememberMe = storedRememberMe === 'true';
    }

  }
  onRememberMeChange(): void {
    localStorage.setItem('rememberMe', this.rememberMe.toString());
  }


  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }


  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        if (this.rememberMe) {
          // Store user credentials in LocalStorage
          localStorage.setItem('storedUsername', username);
          localStorage.setItem('storedPassword', password);
        } else {
          // Clear stored user credentials
          localStorage.removeItem('storedUsername');
          localStorage.removeItem('storedPassword');
        }

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
