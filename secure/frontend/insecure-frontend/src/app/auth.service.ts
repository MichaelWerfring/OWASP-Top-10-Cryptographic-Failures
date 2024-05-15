import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuth():boolean{
    const serverUrl = 'http://localhost:3001/login';

    const token = localStorage.getItem('token');
    if (token === null){
      console.log("no token in storage");
      return false;
    }
    const config = {
      headers: {
        Authorization: token,
      },
    };
  
    axios.post(`${serverUrl}/profile`, config)
      .then(response => {
        console.log("valid token");
        return true;
      })
      .catch(error => {
        
        console.log("invalid token");
        return false;
      });

    return false;
  }


}
