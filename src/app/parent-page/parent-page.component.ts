import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ChildDataService, ChildEntryBean } from '../service/data/child-data.service';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-parent-page',
  standalone: true,
  imports: [MatButtonModule,
      NgIf
  ],
  templateUrl: './parent-page.component.html',
  styleUrl: './parent-page.component.css'
})
export class ParentPageComponent implements OnInit{
  childEntry: string ='';
  constructor(private authenticationService: AuthenticationService, private router: Router, private childDataService: ChildDataService){

  }
  ngOnInit(): void {
    if(!this.authenticationService.isUserLoggedIn()){
      this.router.navigate(['login'])
    }
  }
  getChildRecord(){
    let username = sessionStorage.getItem('authenticatedUser')
    this.childDataService.executeParentDataService(username).subscribe(
      response=>this.handleSuccessfullResponse(response),
      error =>this.handleErrorResponse(error)
    );
  }

  handleSuccessfullResponse(data: ChildEntryBean){
    console.log(data)
    this.childEntry = data.message
    console.log(this.childEntry)
  }
  handleErrorResponse(error: any){
      this.childEntry=error.error.message
  }
}
