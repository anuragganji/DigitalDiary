import { Injectable } from '@angular/core';
import {UserBean} from "./user-data.service";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../app.constants";

export interface TripBean {
  tripId: number,
  tripName: string,
}
export interface TripRelationBean {
  relationId: number,
  tripId: TripBean,
  userId: UserBean
}

export interface CreateTripUsersBean{
  tripName: string,
  usernames: string[]
}

@Injectable({
  providedIn: 'root'
})
export class CollabDataService {

  constructor(
    private http: HttpClient
  ) { }

  executeGetAllTrips(username: string){
    return this.http.get<TripRelationBean[]>(`${API_URL}/trip/all/${username}`)
  }

  executeCreateTrip(tripUsers: CreateTripUsersBean){
    return this.http.post(`${API_URL}/trip/create`, tripUsers)
  }
}
