import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {Router} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {EntryBean, EntryDataService} from '../service/data/entry-data.service';
import {UserBean, UserDataService} from '../service/data/user-data.service';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

import {DatePipe} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-record',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    DatePipe,

  ],
  providers: [
    DatePipe
  ],
  templateUrl: './record.component.html',
  styleUrl: './record.component.css'
})
export class RecordComponent implements OnInit {


  currentDate: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private userDataService: UserDataService,
    private entryDataService: EntryDataService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) {
    const today = new Date();
    this.currentDate = this.datePipe.transform(today, 'yyyy-MM-dd') || '';
  }


  ngOnInit(): void {
    if (!this.authenticationService.isUserLoggedIn()) {
      this.router.navigate(['login'])
    }
  }

  text: string = ''

  record() {
    let username: string = sessionStorage.getItem('authenticatedUser') as string;
    let userData: UserBean
    this.userDataService.executeGetUser(username).subscribe(response => {
      userData = response
      console.log(this.currentDate)
      const newEntry = new EntryBean(this.text, this.currentDate, userData)
      this.entryDataService.executeSetUserRecord(newEntry).subscribe(response => {
        this.text = ''
        const message: string = "Recored updated!!!";
        this.snackBar.open(message, "Done");
      })
      console.log(newEntry)
      // this.entryDataService.
      this.router.navigate(['home'])

    })


  }

}

