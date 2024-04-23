import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  authenticate(username: string,password: string){
    
    if(username=='anurags' && password=='anu'){
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
}
