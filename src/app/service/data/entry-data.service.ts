import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserBean, UserDataService} from './user-data.service';
import {BehaviorSubject} from "rxjs";
import {AuthenticationService} from "../authentication.service";

export class EntryBean{
  constructor(
    public content: string,
    public entryDate: string,
    public userId: UserBean,
    public entryId?: number
  ){}
}
@Injectable({
  providedIn: 'root'
})
export class EntryDataService {
  isLoggedIn=new BehaviorSubject<boolean>(false)
  constructor(private http: HttpClient,
              private userDataService: UserDataService,
              private authenticationService: AuthenticationService
  ) {
  }
  isLoggedInObservable(){
    return this.isLoggedIn.asObservable()
  }

  logout(){
    this.isLoggedIn.next(!this.isLoggedIn.value)
  }

  // execute


  executeParentDataService(username: any){
    return this.http.get<EntryBean>(`http://localhost:8080/entry/parent/user/${username}`);
  }

  executeUserRecordsService(username: any){
    let headers = this.authenticationService.getHeaders()
    return this.http.get<EntryBean[]>(`http://localhost:8080/entry/${username}`,{headers: headers})
  }

  executeGetTodayUserRecordService(username: string) {
    return this.http.get<EntryBean>(`http://localhost:8080/entry/today/${username}`)
  }

  executeUserRecordByDateService(username: string, date: string){
    return this.http.get<EntryBean>(`http://localhost:8080/entry/${username}/${date}`)
  }

  executeSetUserRecord(entryBean: EntryBean) {
    let username: string = this.userDataService.getUsername() as string

    return this.http.post(`http://localhost:8080/entry/create/${username}`, entryBean)
  }

}
