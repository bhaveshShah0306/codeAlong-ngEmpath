import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterDto } from 'src/core/RegisterDto';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  @Output() cancelRegister = new EventEmitter<void>();
  protected creds: RegisterDto = { userName: '', password: '', knownAs: '' };

  register() {
    console.log('Registering user with creds:', this.creds);
  }

  cancel() {
    this.cancelRegister.emit();
  }
}
