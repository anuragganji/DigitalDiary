import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../app.constants";



export interface RegisterBean {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterDataService {

  constructor(
    private http: HttpClient
  ) { }

  executeSetUserRecord(registerBean: RegisterBean) {

    return this.http.post(`${API_URL}/register`, registerBean)
  }
}
