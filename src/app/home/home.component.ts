import {NgFor, NgIf} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';
import {ParentPageComponent} from '../parent-page/parent-page.component';
import {UserBean, UserDataService} from '../service/data/user-data.service';
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor,
    ParentPageComponent,
    NgIf,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  isUserLoggedIn = false

  errorMessage: string = ''
  userBean: UserBean | undefined
  features = [
    {name: 'Past Entries', url: "history", icon: "history"},
    {name: 'Record Entry', url: "record", icon: "edit_note"},
    {name: 'Parental Entries', url: "parent", icon: "escalator_warning"},
    {name: 'Collaboration', url: "collab", icon: "groups"},
  ]

  constructor(private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private router: Router,
              private userDataService: UserDataService
  ) {
    //this.username = route.snapshot.params['name']
  }

  ngOnInit(): void {
    this.isUserLoggedIn = this.authenticationService.isUserLoggedIn()
    if (!this.isUserLoggedIn) {
      this.router.navigate(['login'])
    }

    let username = sessionStorage.getItem('authenticatedUser')
    this.userDataService.executeGetUser(username as string).subscribe(
      response => this.handleSuccessfullResponse(response),
      error => this.handleErrorResponse(error)
    );

  }

  handleSuccessfullResponse(data: UserBean) {

    console.log(data)
    this.errorMessage = '';
    this.userBean = data
    console.log(data)
    console.log(this.userBean)
  }

  handleErrorResponse(error: any) {

    this.userBean = undefined
    this.errorMessage = error.error.message

  }

  switchPage(item: any) {
    this.router.navigate([item.url])
  }
}
