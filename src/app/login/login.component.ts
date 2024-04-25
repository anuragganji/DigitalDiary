import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgIf,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username ='anurag'
  password='anu'
  invalidLogin = false

  constructor(private router: Router, private authenticationService: AuthenticationService){

  }

  login(){
    if(this.authenticationService.authenticate(this.username,this.password)){
      this.router.navigate(['home'])
      this.invalidLogin=false
    } else{
      this.invalidLogin = true
    }
    console.log(this.username)
  }
}
