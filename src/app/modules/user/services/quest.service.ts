import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestService {

  constructor(private _http:HttpClient) { }

  public getParticipants(quest:number, user:number):Promise<any>{
    return new Promise((resolve,reject)=>{
      this._http.get(environment.base_url+`/Quests/getGroupsByQuest/${quest}/${user}`).subscribe(
        data => resolve(data),
        error => reject(error)
      )
    })
  }


  public getQuestBody(quest:number):Promise<any>{
    return new Promise((resolve,reject)=>{
      this._http.get(environment.base_url+`/Quests/GetQuestContent/${quest}`).subscribe(
        data => resolve(data),
        error => reject(error)
      )
    })
  }

  public getQuestions(quest:number):Promise<any>{
    return new Promise((resolve,reject)=>{
      this._http.get(environment.base_url+`/Quests/GetQuestions/${quest}`).subscribe(
        data => resolve(data),
        error => reject(error)
      )
    })
  }


  public getWorsCount(question:number, group:number):Promise<any>{
    return new Promise((resolve,reject)=>{
      this._http.get(environment.base_url+`/Quests/GetResultsByGroupQuestion/${question}/${group}`).subscribe(
        data => resolve(data),
        error => reject(error)
      )
    })
  }


  public postAnswers(data:any):Promise<any>{
    return new Promise((resolve,reject)=>{
      this._http.post<any>(environment.base_url+`/Quests/PostAnswers`, data).subscribe(
        data => resolve(data),
        error => reject(error)
      )
    })
  }
}
