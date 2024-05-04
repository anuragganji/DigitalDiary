import {Injectable} from '@angular/core';
import {UserBean} from "./data/user-data.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs";
import {API_URL} from "../app.constants";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  executeJWTAuthenticateService(username: string,password: string){


    return this.http.post<any>(`${API_URL}/authenticate`,{
      username,
      password
    }).pipe(
      map(
        data => {
          sessionStorage.setItem('authenticatedUser',username)
          sessionStorage.setItem('token',`Bearer ${data.token}`)
          return data
        }
      )
    )

  }

  executeAuthenticateBasicAuthService(username: string,password: string){

    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password)
    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })
    return this.http.get<AuthenticationBean>(`${API_URL}/authenticate`,{headers: headers}).pipe(
      map(
        data => {
          sessionStorage.setItem('authenticatedUser',username)
          sessionStorage.setItem('token',basicAuthHeaderString)
          return data
        }
      )
    )

  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem('authenticatedUser')
    return !(user===null)
  }

  getHeaders(){
    let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader()
    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })
    return headers
  }

  createBasicAuthenticationHttpHeader(){
    let username ='user'
    let password = 'password'
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password)
    return basicAuthHeaderString
  }

  getAuthenticatedUser(){
    return sessionStorage.getItem('authenticatedUser')
  }

  getAuthenticatedToken(): string | null {
    if(this.getAuthenticatedUser())
      return sessionStorage.getItem('token')
    return null
  }
  logout() {
    sessionStorage.removeItem('authenticatedUser')
    sessionStorage.removeItem('token')
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

export interface AuthenticationBean {
  message: string
}
export interface jwtBean{
  username: string,
  password: string
}
