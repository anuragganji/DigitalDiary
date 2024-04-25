import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { NgFor, NgIf } from '@angular/common';
import { UserBean, UserDataService, UserRelationBean } from '../service/data/user-data.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    NgIf,
    NgFor,
    FormsModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: 
  './menu.component.css'
})
export class MenuComponent implements OnInit{
  constructor(public authenticationService: AuthenticationService,
    private router:Router,
    private userDataService: UserDataService
  ){}

  searchTerm: string = '';
  private users: UserBean[] = []
  public errorMessage: string = '' 
  public selectedParent: string = ''

  get filteredList(): UserBean[] {
    if (!this.users) {
      return [];
    }
    return this.users.filter(user =>
      user.username && user.username.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  ngOnInit(): void {
    this.userDataService.executeGetAllUsers().subscribe(
      response=>this.handleSuccessfullResponseAllUsers(response),
      error=>this.handleErrorAllUsers(error)
    );
  }
  switchPage(path:string){
    this.router.navigate([path])
  }
  login(){
    this.switchPage('login')
  }
  
  logout(){
    sessionStorage.removeItem('authenticatedUser')
    this.switchPage('login')
  }

  setParent(userRelationBean: UserRelationBean){
    this.userDataService.executeSetParentDataService(userRelationBean)
    
  }
  handleSuccessfullResponseAllUsers(data: UserBean[]){
    console.log(data)
    this.users = data
    console.log(this.users)
  }
  handleErrorAllUsers(error: any){
      this.errorMessage = error.error.message
  }

}
