import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatIconModule} from '@angular/material/icon';
import {AsyncPipe, NgIf} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatButton} from "@angular/material/button";
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatInput} from "@angular/material/input";
import {UserBean, UserDataService} from "../service/data/user-data.service";
import {CollabDataService} from "../service/data/collab-data.service";
import {CreateTripUsersBean} from "../service/data/collab-data.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-create-trip',
  standalone: true,
  templateUrl: './create-trip.component.html',
  styleUrl: './create-trip.component.css',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatInput,
    NgIf,
  ],
})
export class CreateTripComponent implements OnInit{
  separatorKeysCodes: number[] = [ENTER, COMMA];
  userControl = new FormControl('');
  filteredUsers: Observable<string[]>;


  users: string[] = ['anurag'];
  allUsers: string[] =[]

  // @ts-ignore
  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  constructor(
    private userDateService: UserDataService,
    private collabDataService: CollabDataService,
    private dialogRef: MatDialogRef<CreateTripComponent>,
    private snackBar: MatSnackBar
  ) {
    userDateService.executeGetAllUsers().subscribe(
      response => {
        this.handleSuccessfullResponseAllUsers(response)
        console.log(response)
      },
      error => {
        console.log(error)
      }
    )


    this.filteredUsers = this.userControl.valueChanges.pipe(
      startWith(null),
      map((user: string | null) => (user ? this._filter(user) : this.allUsers.slice())),
    );
  }
  ngOnInit(): void {

  }


  userForm = new FormGroup({
    title: new FormControl('', Validators.required),
  });

  create(){
    console.log('Creating trip')
    let createTripUsersBean: CreateTripUsersBean = {
      tripName: this.userForm.get('title')?.value as string,
      usernames: this.users
    }
    this.collabDataService.executeCreateTrip(createTripUsersBean).subscribe(
      response => {
        const message: string = "Trip Created!!!";
        this.snackBar.open(message, "Done");

        console.log(response)
        this.dialogRef.close();
      },
      error => {
        this.dialogRef.close();
        console.log(error)
      }
    )
  }

  cancel(){
    this.dialogRef.close();
  }



  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();


    if (value) {
      this.users.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.userControl.setValue(null);
  }

  remove(user: string): void {
    const index = this.users.indexOf(user);

    if (index >= 0) {
      this.users.splice(index, 1);

      this.announcer.announce(`Removed ${user}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.users.push(event.option.viewValue);
    this.userInput.nativeElement.value = '';
    this.userControl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allUsers.filter(user => user.toLowerCase().includes(filterValue));
  }

  handleSuccessfullResponseAllUsers(data: UserBean[]) {
    console.log(data)
    this.allUsers = data.map(user => user.username)

    console.log(this.users)
  }
}

