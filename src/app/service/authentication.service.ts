import {Injectable} from '@angular/core';
import {UserBean} from "./data/user-data.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  authenticate(username: string,password: string){

    if (username == 'keshav' && password == 'kes') {
      sessionStorage.setItem('authenticatedUser',username)
      return true
    }else{
      return false
    }

  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem('authenticatedUser')
    return !(user===null)
  }

  thing() {
    let users = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(x => {

      return {
        userId: x,
        firstName: `User ${x}`,
        lastName: `Last ${x}`,
        username: `user${x}`,
      } as UserBean
    })

    return users
  }
}
