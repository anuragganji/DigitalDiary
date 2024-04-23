import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { ParentPageComponent } from '../parent-page/parent-page.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor,
    ParentPageComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  isUserLoggedIn = false

  username = ""
  features = [
    {feature: 'View Old Entries'},
    {feature: 'Record Entry'},
    {feature: 'Parental Entries'},
    {feature: 'Collaboration'}
  ]

  constructor(private route:ActivatedRoute, private authenticationService: AuthenticationService, private router: Router){
    //this.username = route.snapshot.params['name']
  }
  ngOnInit(): void {
    this.isUserLoggedIn = this.authenticationService.isUserLoggedIn()
    if(!this.isUserLoggedIn){
      this.router.navigate(['login'])
    }
  }
  switchPage(){
    this.router.navigate(['parent'])
  }
}
