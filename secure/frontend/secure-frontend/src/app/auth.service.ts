import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  static async isAuth(): Promise<boolean>{
    //const serverUrl = 'https://localhost:433/login';

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
  
    axios.get(`https://localhost/profile`, config)
      .then(response => {
        console.log("valid token");
        console.log(response);
        return false;
      })
      .catch(error => {
        console.log("invalid token");
        return true;
      });

      return false;
  }


}
