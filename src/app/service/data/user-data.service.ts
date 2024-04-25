import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


export class UserBean{
  constructor(
    public userId: number,
    public firstName: string,
    public lastName: string,
    public username: string,
    public email: string
  ){}
}
export class userCredBean{
  constructor(
    public userCredId: number,
    public userId: UserBean,
    public password: string
  ){}
}
export class UserRelationBean{
  constructor(
    public userRelationId: number,
    public userId: UserBean,
    public parentUserId: UserBean,
  ){

  }
}

@Injectable({
  providedIn: 'root'
})

export class UserDataService {

  constructor(public http:HttpClient) { }

  executeSetParentDataService(userRelationBean: UserRelationBean){
    return this.http.post<UserRelationBean>(`http://localhost:8080/user_relation`,userRelationBean)
  }

  executeGetAllUsers(){
    return this.http.get<UserBean[]>(`http://localhost:8080/user/all`)
  }
  executeGetUser(username: any){
    return this.http.get<UserBean>(`http://localhost:8080/user/${username}`)
  }
}
