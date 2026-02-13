import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs/operators';
import { LoginDto } from 'src/core/login';
import { RegisterDto } from 'src/core/RegisterDto';
import { UserDto } from 'src/core/userdto';
import { PresenceService } from './presence.service';
import { HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  private presenceService = inject(PresenceService);
  currentUser = signal<UserDto | null>(null);

  baseUrl = 'https://localhost:5001/api/';
  register(creds: RegisterDto) {
    return this.http
      .post<UserDto>(this.baseUrl + 'account/register', creds)
      .pipe(
        tap((user) => {
          if (user) {
            this.setCurrentUser(user);
          }
        }),
      );
  }
  login(creds: LoginDto) {
    return this.http
      .post<UserDto>(this.baseUrl + 'account/login', creds, {
        withCredentials: true,
      })
      .pipe(
        tap((user) => {
          if (user) {
            this.setCurrentUser(user);
          }
        }),
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
  setCurrentUser(user: UserDto) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
    if (
      this.presenceService.hubConnection?.state !== HubConnectionState.Connected
    ) {
      this.presenceService.createHubConnection(user);
    }
  }
}
