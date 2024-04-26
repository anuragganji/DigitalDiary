import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EntryBean, EntryDataService } from '../service/data/entry-data.service';
import { UserBean, UserDataService } from '../service/data/user-data.service';
import { FormsModule, NgModel } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { DatePipe } from '@angular/common';

const moment = _rollupMoment || _moment;
@Component({
  selector: 'app-record',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    DatePipe
    
  ],
  templateUrl: './record.component.html',
  styleUrl: './record.component.css'
})
export class RecordComponent implements OnInit{
  constructor(private authenticationService: AuthenticationService, private router: Router,
    private userDataService: UserDataService,
    private entryDataService: EntryDataService,
    private datePipe: DatePipe
  ){}

  currentDate: string=''

  
  ngOnInit(): void {
    if(!this.authenticationService.isUserLoggedIn()){
      this.router.navigate(['login'])
    }

    const today = new Date();
    this.currentDate = this.datePipe.transform(today, 'yyyy-MM-dd')!;

    }
  text: string = ''
     
  record(){
    let username: string = sessionStorage.getItem('authenticatedUser') as string;
    let userData:UserBean
    const entryDate = new Date();
    this.userDataService.executeGetUser(username).subscribe(response=>{
      userData = response
      const newEntry = new EntryBean(this.text,entryDate,userData)
      console.log(newEntry)
      // this.entryDataService.
    })
    





  }

}

