import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs/operators';
import { LoginDto } from 'src/core/login';
import { UserDto } from 'src/core/userdto';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  currentUser = signal<UserDto | null>(null);

  baseUrl = 'https://localhost:5001/api/';
  login(creds: LoginDto) {
    return this.http
      .post<UserDto>(this.baseUrl + 'account/login', creds, {
        withCredentials: true,
      })
      .pipe(
        tap((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }),
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
  getCurrentUser() {
    return this.http.get(this.baseUrl + 'account/current', {
      withCredentials: true,
    });
  }
}
