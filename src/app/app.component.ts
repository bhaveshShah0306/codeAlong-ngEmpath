import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { NavbarComponent } from '../layout/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: {
    'data-theme': 'light',
  },
})
export class AppComponent implements OnInit {
  constructor() {}
  protected router = inject(Router);
  ngOnInit() {
    this.loadMembers();
  }
  async loadMembers() {
    try {
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  }
}
