import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatButtonModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{
  constructor(public authenticationService: AuthenticationService,private router:Router){

  }
  ngOnInit(): void {
  }
  logout(){
    sessionStorage.removeItem('authenticatedUser')
    this.router.navigate(['login'])
  }
}
