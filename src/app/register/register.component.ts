import {Component, OnInit} from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl, FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {catchError, delay, map, Observable, of} from "rxjs";
import {NgIf} from "@angular/common";
import {UserDataService} from "../service/data/user-data.service";
import {RegisterBean, RegisterDataService} from "../service/data/register-data.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<RegisterComponent>,
              private userDataService: UserDataService,
              private registerDataService: RegisterDataService
  ) {
  }

  userForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', {
      validators: Validators.required,
      asyncValidators: this.usernameValidator(),
      updateOn: 'blur'
    })
  });

  username!: FormControl;

  usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      // Simulate an asynchronous check against the database
      return this.checkUsernameAvailability(control.value).pipe(
        map(available => (available ? null : {usernameTaken: true})),
        delay(100) // Simulate delay for better user experience (remove this in production)
      );
    };
  }

  checkUsernameAvailability(username1: string): Observable<boolean> {
    // Simulate checking against the database (replace this with actual database check)
    return this.checkUsernameAvailabilityFromDatabase(username1).pipe(
      map(response => {
        // If response is truthy (username exists), return false
        // If response is falsy (username does not exist), return true
        return !response;
      }),
      catchError(error => {
        console.log(error);
        // If there's an error, assume username is available and return true
        return of(true);
      })
    );
  }

  checkUsernameAvailabilityFromDatabase(username1: string): Observable<any> {
    return this.userDataService.executeGetUser(username1);
  }

  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  register() {

    if (this.userForm.valid) {
      const registerDetails = this.userForm.value as RegisterBean;
      console.log(registerDetails);
      this.registerDataService.executeSetUserRecord(registerDetails).subscribe(
        response => {
          console.log(response);
        },error => {
          console.log(error);
        }
      );

    }


    this.dialogRef.close();
  }

}
