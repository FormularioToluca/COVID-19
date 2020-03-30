import { Component, OnInit } from '@angular/core';
import {QuestService} from '../../services/quest.service';
import {GroupService} from '../../services/group.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  public _quest = null;
  public _questions = null;
  public _ready = false;
  public _participant =null
  
  constructor(private _qs:QuestService, private _activated:ActivatedRoute, private _gs:GroupService, private _router:Router) { }

  ngOnInit() {
    this._quest = this._activated.snapshot.params.quest
    let group = this._activated.snapshot.params.participant
    this._qs.getQuestions(this._quest).then(data=>{
      this._questions = data.$values;
      console.log(this._questions);
      this.getGroup(group);
    }).catch(error=>{
      console.log(error);
      
    })
  }


  public getGroup(g:number){
    this._gs.getGroup(g).then(data=>{
      this._participant = data;
      this._ready = true;
    }).catch(error=>{
      console.log(error);
      
    })
  }

  replace(body: string, fillable: boolean): string {
    let bd = body;
    if (fillable) {
      bd = body.replace("XXX", this._participant.name)
    }
    return bd;
  }

  change(question:number, type:boolean){
    let p = this._activated.snapshot.params.participant;
    let q = this._activated.snapshot.params.quest;
    let t = this._activated.snapshot.params.type;
    if(type)//open
    {
      this._router.url
      this._router.navigate([`results/${t}/${q}/${p}/question/${question}/open`]);
    }else{
      this._router.navigate([`results/${t}/${q}/${p}/question/${question}/close`]);
    }
  }




}
