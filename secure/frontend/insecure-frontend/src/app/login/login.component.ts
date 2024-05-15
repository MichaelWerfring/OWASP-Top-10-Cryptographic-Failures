import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {FormsModule} from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
     ReactiveFormsModule,
      MatIconModule,
       FormsModule,
        MatFormFieldModule,
         MatInputModule,
         MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  
})
export class LoginComponent {

  constructor(private snackBar: MatSnackBar) {
  }

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
        localStorage.setItem('username', response.data.user.username);
        localStorage.setItem('userId', response.data.user.id);
        localStorage.setItem('email', response.data.user.email) ;
        localStorage.setItem('token', response.data.token);
        window.location.href = '/profile';
      })
      .catch(error => {
        this.snackBar.open('Invalid Login', 'Dismiss', {
          duration: 3000
        });
        console.error('Error message:', error.response.data.error);
        
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
