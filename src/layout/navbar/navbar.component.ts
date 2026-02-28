import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginDto } from 'src/core/login';
import { AccountService } from 'src/services/account.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from 'src/services/toast.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  protected account = inject(AccountService);
  protected creds: LoginDto = { userName: '', password: '' };
  protected toastService = inject(ToastService);
  private router = inject(Router);

  login() {
    this.account.login(this.creds).subscribe({
      next: (result) => {
        console.log('login successful', result);
        this.creds = { userName: '', password: '' };
        this.router.navigateByUrl('/members');
        this.toastService.show('Login successful', 'success');
      },
      error: (error) => {
        this.toastService.show(error.message, 'error');
      },
    });
  }
  logout() {
    this.account.logout();
    this.toastService.show('Logged out successfully');
    this.router.navigateByUrl('/');
  }
}
