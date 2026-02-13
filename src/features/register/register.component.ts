import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Member } from 'src/core/Members';
import { RegisterDto } from 'src/core/RegisterDto';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  cancelRegister = output<boolean>();
  protected creds: RegisterDto = {
    userName: '',
    email: '',
    password: '',
    knownAs: '',
  };

  private accountService = inject(AccountService);

  async ngOnInit() {
    try {
      // this.members.set(this.membersFromHome());
      // const members = await this.getMembers();
      // this.members.set(members);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  }

  register() {
    this.accountService.register(this.creds).subscribe({
      next: (user) => {
        console.log('User registered:', user);
        this.cancel();
      },
      error: (error) => {
        console.error('Error registering user:', error);
      },
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
