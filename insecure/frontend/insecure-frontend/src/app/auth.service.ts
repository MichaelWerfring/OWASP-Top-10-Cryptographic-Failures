import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuth():boolean{
    const serverUrl = 'http://10.0.2.15:3001';

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
  
    axios.get(`${serverUrl}/profile`, config)
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
