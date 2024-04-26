import {Component, Inject, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { UserBean, UserDataService, UserRelationBean } from '../service/data/user-data.service';
import { FormControl, FormsModule } from '@angular/forms';

import {MatSnackBar} from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    NgIf,
    NgFor,
    FormsModule,

  ],
  templateUrl: './menu.component.html',
  styleUrl: 
  './menu.component.css'
})
export class MenuComponent implements OnInit{
  constructor(public authenticationService: AuthenticationService,
    private router:Router,
    public dialog: MatDialog,
    private userDataService: UserDataService,
    private snackBar: MatSnackBar
  ){}

  public errorMessage: string = '' 
  private selectedParent=''



  ngOnInit(): void {
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
  setParent(username: string){
    console.log(username)
    this.selectedParent = username
    let child = sessionStorage.getItem('authenticatedUser')
    let parentUser:UserBean
    this.userDataService.executeGetUser(this.selectedParent).subscribe(response=> {
      parentUser = response; 
      this.userDataService.executeSetParentDataService(child as string, parentUser).subscribe(response => {
        const message:string = "Parent access given to "+ parentUser.firstName.toUpperCase();
        this.snackBar.open(message,"Done");
      });
  });
}

  selectParent(){
    const dialogRef = this.dialog.open(SetParentDialog, {

      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      this.selectedParent = result;
      this.setParent((this.selectedParent))

    });
  }
  
  

}
@Component({
  selector: 'set-parent-dialog',
  templateUrl: 'set-parent-dialog.html',
  standalone: true,
  imports:[
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatInputModule,
    MatAutocompleteModule,
    AsyncPipe,
    NgFor
  ]
})
export class SetParentDialog implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<SetParentDialog>,
    private userDataService: UserDataService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  ngOnInit(): void {
    this.userDataService.executeGetAllUsers().subscribe(
      response=>this.handleSuccessfullResponseAllUsers(response),
      error=>this.handleErrorAllUsers(error)
    );
  }

  myControl = new FormControl('');

  public selectedParent: string = ''
  private users: string[] = []
  public searchTerm: string = '';

  public errorMessage: string = '' 

  get filteredList(): string[] {
    if (!this.users) {
      return [];
    }
    return this.users.filter(user =>
      user && user.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  setParentUser(user: string){
    this.selectedParent = user
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  handleSuccessfullResponseAllUsers(data: UserBean[]){
    console.log(data)
    this.users = data.map(user=>user.username)

    console.log(this.users)
  }
  handleErrorAllUsers(error: any){
    this.errorMessage = error.error.message
}
}
