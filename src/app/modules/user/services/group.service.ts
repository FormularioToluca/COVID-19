import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private _http:HttpClient) { }

  public getGroup(group:number):Promise<any>{
    return new Promise((resolve,reject)=>{
      this._http.get(environment.base_url+`/Groups/GetGroups/${group}`).subscribe(
        data => resolve(data),
        error => reject(error)
      )
    })
  }
}
