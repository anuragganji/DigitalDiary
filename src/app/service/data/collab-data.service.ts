import { Injectable } from '@angular/core';
import {UserBean} from "./user-data.service";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../app.constants";

export interface TripBean {
  tripId: number,
  userId: UserBean,
  tripName: string,
}

@Injectable({
  providedIn: 'root'
})
export class CollabDataService {

  constructor(
    private http: HttpClient
  ) { }

  executeGetAllTrips(username: string){
    return this.http.get<TripBean[]>(`${API_URL}/trip/all/${username}`)
  }
}
