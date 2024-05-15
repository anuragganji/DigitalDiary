import {Component, OnInit, ViewChild} from '@angular/core';
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {DatePipe, NgForOf, NgIf, SlicePipe} from "@angular/common";
import {MatPaginator} from "@angular/material/paginator";
import {PostBean, PostDataService} from "../service/data/post-data.service";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    FormsModule,
    DatePipe,
    MatPaginator,
    NgForOf,
    NgIf,
    SlicePipe,
    MatIcon,
    MatButtonModule
  ],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css'
})
export class TripComponent implements OnInit{
  postBean: PostBean[] = []

  editFlag: boolean = false;

  text: string = ''
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  tripId: number = 0;

  // create() {
  //   let beans: PostBean[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(x => {
  //     return {
  //       postId: x,
  //       content: `Content for  found myself immersed in a whirlwind of activities. From meetings to deadlines, every moment seemed to blur into the next, yet I embraced the challenges with determination and resilience. Amidst the chaos of work, I stole moments of tranquility to pause and admire the beauty of nature, a gentle reminder of life's delicate balance`,
  //       postDate: new Date().toString(),
  //       userId: {
  //         userId: x,
  //         email: 'djfhnh@nhf.df',
  //         firstName: 'John',
  //         lastName: 'Doe',
  //         password: 'password',
  //         username: 'johndoe'
  //       } as UserBean
  //     } as PostBean;
  //   });
  //   return beans;
  // }

  constructor(private route: ActivatedRoute,
              private postDataService: PostDataService,
              ) { }

  ngOnInit(): void {
    // Retrieve the variable from the query parameters
    this.route.queryParams.subscribe(params => {
      this.tripId = params['id'];

      console.log("This is Trip ID: " + this.tripId)

      // Retrieve posts
      this.postDataService.executeGetAllPosts(this.tripId).subscribe(
        response => {
          this.postBean = response
          console.log(response)
        },
        error => {
          console.log(error)
        }
      )
      console.log(this.tripId)
    });



  }


  post(){
    //create post
    this.postDataService.executeCreatePost(this.text, this.tripId).subscribe(
      response => {
        this.text = ''
        this.postBean.push(response)
        console.log(response)
      },
      error => {
        console.log(error)
      }
    )
    this.editFlag = false;

    console.log('Posting post')

    //retrieve posts again
  }

  changeFlag(){
    this.editFlag = !this.editFlag;
  }

}
