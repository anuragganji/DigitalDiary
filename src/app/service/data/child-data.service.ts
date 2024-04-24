import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

export class ChildEntryBean{
  constructor(public entry_id: number, public content: string, public date: Date, public userId: String){}
}

@Injectable({
  providedIn: 'root'
})
export class ChildDataService {

  constructor(private http:HttpClient) { }

  executeParentDataService(username: any){
    return this.http.get<ChildEntryBean>('http://localhost:8080/entry/parent/2');
  }
}