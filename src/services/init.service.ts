import { inject, Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  private account = inject(AccountService);

  init(): Observable<null> {
    const userString = localStorage.getItem('user');
    if (!userString) return of(null);
    const user = JSON.parse(userString);
    this.account.currentUser.set(user);

    return of(null);
  }
}
