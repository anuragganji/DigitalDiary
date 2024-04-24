import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

export class EntryBean{
  constructor(public entry_id: number, public content: string, public date: Date, public userId: String){}
}
@Injectable({
  providedIn: 'root'
})
export class EntryDataService {
  constructor(private http:HttpClient) { }

  // execute

  executeParentDataService(username: any){
    return this.http.get<EntryBean>('http://localhost:8080/entry/parent/2');
  }

  executeUserRecordsService(username: any){
    return this.http.get<EntryBean[]>(`http://localhost:8080/entry/${username}`)
  }
}
