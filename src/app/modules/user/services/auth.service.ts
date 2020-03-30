import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient, private _router:Router) { }

  public authUser(){
    return new Promise((resolve, reject)=>{
      this._http.get(environment.base_url+'/Auth/GetUserData').subscribe(
        data =>{
          localStorage.setItem('user', JSON.stringify(data));
          resolve(data)
        },
        error =>{
          this._router.navigate(['error']);
          reject(error)
        }
      )
    })
  }
}
