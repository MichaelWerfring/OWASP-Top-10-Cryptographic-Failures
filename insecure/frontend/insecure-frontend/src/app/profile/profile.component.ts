import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import axios from 'axios';

@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [NavbarComponent]
})
export class ProfileComponent {
  profilePicture: string = 'https://via.placeholder.com/150';

  public submitLogout() {
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    window.location.href = '/login'; 
  }
  
  constructor() {
    this.name =localStorage.getItem('username') ?? "failed";
    this.userId = localStorage.getItem('userId') ?? "failed";
    this.email = localStorage.getItem('email') ?? "failed";
  }

  name: string;
  userId: string;
  email: string;
}
