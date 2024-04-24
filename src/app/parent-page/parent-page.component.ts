import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { EntryBean, EntryDataService } from '../service/data/entry-data.service';
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
  errorMessage: string = ''
  constructor(private authenticationService: AuthenticationService, private router: Router, private entryDataService: EntryDataService){

  }
  ngOnInit(): void {
    if(!this.authenticationService.isUserLoggedIn()){
      this.router.navigate(['login'])
    }
  }
  getChildRecord(){
    let username = sessionStorage.getItem('authenticatedUser')
    this.entryDataService.executeParentDataService(username).subscribe(
      response=>this.handleSuccessfullResponse(response),
      error =>this.handleErrorResponse(error)
    );
  }

  handleSuccessfullResponse(data: EntryBean){
    console.log(data)
    this.errorMessage='';
    this.childEntry = data.content
    console.log(this.childEntry)
  }
  handleErrorResponse(error: any){
    this.childEntry='';
      this.errorMessage=error.error.message
  }
}
