import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Member } from 'src/core/Members';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private accountService = inject(AccountService);
  protected title = 'Empath App';
  protected registerMode = signal<boolean>(false);
  protected members = signal<Member[]>([]);
  private http = inject(HttpClient);

  async ngOnInit() {
    // this.members.set(await this.getMembers());
    this.setCurrentUser();
    const data = await this.getMembers();
    console.log('Members data:', data); // Check if data is coming
    this.members.set(data);
  }

  showRegister() {
    this.registerMode.set(true);
  }
  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    next: this.accountService.currentUser.set(user);
  }

  async getMembers() {
    try {
      return lastValueFrom(
        this.http.get<Member[]>('https://localhost:5001/api/members/'),
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
