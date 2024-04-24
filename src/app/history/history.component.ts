import { Component, OnInit } from '@angular/core';
import { EntryBean, EntryDataService } from '../service/data/entry-data.service';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})

// export class 
export class HistoryComponent implements OnInit{

  entryBean: EntryBean[] = []

  constructor(private authenticationService: AuthenticationService, private router: Router, private entryDataService: EntryDataService){}
  
  ngOnInit(): void {
    if(!this.authenticationService.isUserLoggedIn()){
      this.router.navigate(['login'])
    }
    let username = sessionStorage.getItem('authenticatedUser')
    this.entryDataService.executeUserRecordsService(username)
  }

}
