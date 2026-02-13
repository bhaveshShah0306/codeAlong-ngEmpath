import { Component, input } from '@angular/core';
import { Member } from 'src/core/Members';

@Component({
  selector: 'app-members-list',
  standalone: true,
  imports: [],
  templateUrl: './members-list.component.html',
  styleUrl: './members-list.component.scss',
})
export class MembersListComponent {
  protected title = 'Empath App';
  protected membersfromHome = input.required<Member[]>();
}
