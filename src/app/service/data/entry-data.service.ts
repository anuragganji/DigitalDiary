import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserBean, UserDataService} from './user-data.service';

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
  constructor(private http: HttpClient,
              private userDataService: UserDataService
  ) {
  }

  // execute


  executeParentDataService(username: any){
    return this.http.get<EntryBean>(`http://localhost:8080/entry/parent/user/${username}`);
  }

  executeUserRecordsService(username: any){
    return this.http.get<EntryBean[]>(`http://localhost:8080/entry/${username}`)
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
