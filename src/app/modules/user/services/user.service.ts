import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }
  
  public  getGroupsByUser(user:number):Promise<any>{
    return new Promise((resolve, reject)=>{
      this._http.get(environment.base_url+`/Users/GetGroupsByUser/${user}`).subscribe(
        data => resolve(data),
        error => reject(error)
      )
    })
  }

  public getQuestByGroup(group:number):Promise<any>{
    return new Promise((resolve,reject)=>{
      this._http.get(environment.base_url+`/Users/GetQuestByGroup/${group}`).subscribe(
        data => resolve(data),
        error => reject(error)
      )
    })
  }
}
