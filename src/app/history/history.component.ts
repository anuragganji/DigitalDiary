import {Component, OnInit} from '@angular/core';
import {EntryBean, EntryDataService} from '../service/data/entry-data.service';
import {AuthenticationService} from '../service/authentication.service';
import {Router} from '@angular/router';
import {DatePipe, NgFor, NgIf, SlicePipe} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';

import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import {MatInputModule} from '@angular/material/input';
import {UserDataService} from '../service/data/user-data.service';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-history',
  standalone: true,
  providers: [
    provideMomentDateAdapter(MY_FORMATS),
  ],
  imports: [NgFor,
    NgIf,
    MatButtonModule,
    DatePipe,
    MatPaginatorModule,
    SlicePipe,
    MatSlideToggleModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    ReactiveFormsModule


  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})

// export class
export class HistoryComponent implements OnInit{

  errorMessage: string = ''
  isChecked: boolean = false
  entryBean: EntryBean[] = []
  entryBeanDate: EntryBean | undefined
  date1 = new FormControl(moment());
  username: string =''

  constructor(private authenticationService: AuthenticationService, private router: Router, private entryDataService: EntryDataService,
              private userDataService: UserDataService
  ) {
  }

  onDateSelected(event: any): void {
    console.log('Selected Date:', event.value);
    const selectedDate: string = event.value.format('YYYY-MM-DD');
    console.log(selectedDate)

    this.entryDataService.executeUserRecordByDateService(this.username as string,selectedDate).subscribe(response=>this.handleSuccessfullResponseByDate(response),
    error =>this.handleErrorResponse(error,this.entryBeanDate))

  }

  getUserRecords(){
    console.log(this.username)
    this.entryDataService.executeUserRecordsService(this.username).subscribe(response=>this.handleSuccessfullResponse(response),
    error =>this.handleErrorResponse(error,this.entryBean))
  }

  getTodayEntry() {
    let username: string = this.userDataService.getUsername() as string
    this.entryDataService.executeGetTodayUserRecordService(username).subscribe(response => this.entryBeanDate = response)
  }

  ngOnInit(): void {

    if(!this.authenticationService.isUserLoggedIn()){
      this.router.navigate(['login'])
    }

    this.username = sessionStorage.getItem('authenticatedUser') as string
    this.getUserRecords()

    this.getTodayEntry()


  }

  handleSuccessfullResponseByDate(data: EntryBean){

    console.log(data)
    this.errorMessage='';
    this.entryBeanDate = data
    console.log(data)
    console.log(this.entryBeanDate.entryDate)
    console.log(this.entryBean)
  }
  handleSuccessfullResponse(data: EntryBean[]){

    console.log(data)
    this.errorMessage='';
    this.entryBean = data
    console.log(data)
    console.log(this.entryBean[0].entryDate)
    console.log(this.entryBean)
  }

  handleErrorResponse(error:any, item: any){

    this.entryBeanDate = undefined
    item = undefined
    this.errorMessage=error.error.message

  }

}
