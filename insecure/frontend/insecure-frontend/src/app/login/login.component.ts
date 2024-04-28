import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
  }
  
  applyForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl('')
  });
}
