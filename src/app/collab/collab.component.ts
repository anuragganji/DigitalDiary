import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIcon} from "@angular/material/icon";
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {CollabDataService, TripRelationBean} from "../service/data/collab-data.service";
import {UserDataService} from "../service/data/user-data.service";

import {MatDialogConfig, MatDialog} from "@angular/material/dialog";
import {CreateTripComponent} from "../create-trip/create-trip.component";

@Component({
  selector: 'app-collab',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIcon, NgForOf, MatButton],
  templateUrl: './collab.component.html',
  styleUrl: './collab.component.css'
})
export class CollabComponent implements OnInit {


  constructor(private router: Router,
              private collabDataService: CollabDataService,
              private userDataService: UserDataService,
              public dialog: MatDialog,) {
  }

  ngOnInit() {
    this.collabDataService.executeGetAllTrips(this.userDataService.getUsername() as string).subscribe(
      response => {
        this.trips = response
        console.log(response)
      },
      error => {
        console.log(error)
      }
    )

  }

  trips: TripRelationBean[] = []

  createTrip() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '40%'
    const dialogRef = this.dialog.open(CreateTripComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
      console.log('The dialog was closed');
    });

    console.log('Creating trip')
  }

  switchPage(id: number) {

    console.log(id)
    this.router.navigate(['/trip', id], {queryParams: {id: id}});

  }

}
