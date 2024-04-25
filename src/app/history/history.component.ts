import { Component, OnInit } from '@angular/core';
import { EntryBean, EntryDataService } from '../service/data/entry-data.service';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { DatePipe, NgFor, NgIf, SlicePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [NgFor,
    NgIf,
    MatButtonModule,
    DatePipe,
    MatPaginatorModule,
    SlicePipe,
    MatSlideToggleModule,
    FormsModule
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})

// export class 
export class HistoryComponent implements OnInit{

  errorMessage: string = ''
  isSubscribedToEmailsMessage: boolean = false
  isChecked: boolean = false

  entryBean: EntryBean[] = []

  constructor(private authenticationService: AuthenticationService, private router: Router, private entryDataService: EntryDataService){}

  getUserRecords(){
    let username = sessionStorage.getItem('authenticatedUser')
    console.log(username)
    this.entryDataService.executeUserRecordsService(username).subscribe(response=>this.handleSuccessfullResponse(response),
    error =>this.handleErrorResponse(error))
  }
  
  ngOnInit(): void {
    if(!this.authenticationService.isUserLoggedIn()){
      this.router.navigate(['login'])
    }
    this.getUserRecords()
    
 
  }

  handleSuccessfullResponse(data: EntryBean[]){

    console.log(data)
    this.errorMessage='';
    this.entryBean = data
    console.log(data)
    console.log(this.entryBean[0].entryDate)
    console.log(this.entryBean)
  }

  handleErrorResponse(error:any){

    this.entryBean = []
    this.errorMessage=error.error.message

  }

}
