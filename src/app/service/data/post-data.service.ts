import {Injectable} from '@angular/core';
import {UserBean, UserDataService} from "./user-data.service";
import {API_URL} from "../../app.constants";
import {TripBean} from "./collab-data.service";
import {HttpClient} from "@angular/common/http";

export interface PostBean {
  content: string,
  userId: UserBean,
  tripId: TripBean,
  postDate: string,
  postId?: number,
}
export interface PostDTOBean {
  content: string,
}


@Injectable({
  providedIn: 'root'
})
export class PostDataService {

  constructor(
    private http: HttpClient,
    private userDataService: UserDataService
  ) {
  }

  executeGetAllTrips(tripId: number) {
    return this.http.get<PostBean[]>(`${API_URL}/post/all/${tripId}`)
  }

  executeCreatePost(content: string, tripId: number) {
    let username: string = this.userDataService.getUsername() as string

        let post: PostDTOBean = {
          content: content
        }
        return this.http.post<PostBean>(`${API_URL}/post/create/${tripId}/${username}`, post);


  }
}
