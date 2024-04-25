import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserBean } from './user-data.service';

export class EntryBean{
  constructor(
    public entryId: number,
    public content: string,
    public entryDate: Date,
    public userId: UserBean){}
}
@Injectable({
  providedIn: 'root'
})
export class EntryDataService {
  constructor(private http:HttpClient) { }

  // execute

  executeParentDataService(username: any){
    return this.http.get<EntryBean>(`http://localhost:8080/entry/parent/user/${username}`);
  }

  executeUserRecordsService(username: any){
    return this.http.get<EntryBean[]>(`http://localhost:8080/entry/${username}`)
  }
  executeUserRecordByDateService(username: string, date: string){
    return this.http.get<EntryBean>(`http://localhost:8080/entry/${username}/${date}`)
  }

}
