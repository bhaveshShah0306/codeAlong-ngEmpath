import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Member } from 'src/core/Members';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  protected title = 'Empath App';
  protected members = signal<Member[]>([]);
  private http = inject(HttpClient);

  async ngOnInit() {
    // this.members.set(await this.getMembers());
    const data = await this.getMembers();
    console.log('Members data:', data); // Check if data is coming
    this.members.set(data);
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
