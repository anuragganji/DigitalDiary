import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {API_URL} from "../../app.constants";

export interface UserBean {
  userId: number,
  firstName: string,
  lastName: string,
  username: string,
  email: string
}

export interface UserCred {
  userCredId: number,
  userId: UserBean,
  password: string
}

export interface UserRelation {
  userRelationId: number,
  userId: UserBean,
  parentUserId: UserBean
}


export class UserCredBean {
  constructor(
    public userCredId: number,
    public userId: UserBean,
    public password: string
  ) {
  }
}

export class UserRelationBean {
  constructor(
    public userRelationId: number,
    public userId: UserBean,
    public parentUserId: UserBean,
  ) {

  }
}

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(public http: HttpClient
  ) {
  }

  getUsername() {
    return sessionStorage.getItem('authenticatedUser')
  }

  executeSetParentDataService(child: string, parent: UserBean) {

    return this.http.post<UserRelationBean>(`http://localhost:8080/parent/set/${child}`, parent)
  }


  executeGetAllUsers() {
    return this.http.get<UserBean[]>(`http://localhost:8080/user/all`)
  }

  executeGetUser(username: string) {
    return this.http.get<UserBean>(`${API_URL}/user/${username}`)
  }
}
