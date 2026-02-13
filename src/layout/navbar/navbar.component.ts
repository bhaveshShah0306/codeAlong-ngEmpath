import { Component, inject, signal } from '@angular/core';
import { MembersListComponent } from 'src/features/members/members-list/members-list.component';
import { FormsModule } from '@angular/forms';
import { LoginDto } from 'src/core/login';
import { AccountService } from 'src/services/account.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  protected account = inject(AccountService);
  protected creds: LoginDto = { userName: '', password: '' };

  login() {
    this.account.login(this.creds).subscribe({
      next: (result) => {
        console.log('login successful', result);
        this.creds = { userName: '', password: '' };
      },
      error: (error) => alert(error.message),
    });
  }
  logout() {
    this.account.logout();
  }
}
