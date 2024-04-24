import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-record',
  standalone: true,
  imports: [],
  templateUrl: './record.component.html',
  styleUrl: './record.component.css'
})
export class RecordComponent implements OnInit{
  constructor(private authenticationService: AuthenticationService, private router: Router){}
  
  ngOnInit(): void {
    if(!this.authenticationService.isUserLoggedIn()){
      this.router.navigate(['login'])
    }
}
}
