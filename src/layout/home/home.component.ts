import { HttpClient } from '@angular/common/http';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Member } from 'src/core/Members';
import { RegisterComponent } from 'src/features/register/register.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  protected registerMode = signal<boolean>(false);
  protected members = signal<Member[]>([]);

  private http = inject(HttpClient);

  async ngOnInit() {
    // this.members.set(await this.getMembers());
    const data = await this.getMembers();
    this.members.set(data);
  }

  showRegister(value: boolean) {
    this.registerMode.set(value);
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
