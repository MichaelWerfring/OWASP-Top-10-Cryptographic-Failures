import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  
})
export class LoginComponent {
  submitLogin() {
    console.log(this.applyForm.value.userName + ' \n'
     + this.applyForm.value.password);
     
     const userData = {
      username: this.applyForm.value.userName,
      password: this.applyForm.value.password
    };
    
    axios.post('http://localhost:3001/login', userData)
      .then(response => {
        console.log('Login successful');
        console.log('User data:', response.data);
        //window.location.href = '/game';
      })
      .catch(error => {
        console.error('Login failed');
        console.error('Error message:', error.response.data.error);
        alert("Login failed. Please try again.");
        this.applyForm.patchValue({
          password: ''
        });
      });
  }
  
  applyForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl('')
  });
}
