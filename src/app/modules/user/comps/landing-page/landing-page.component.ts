import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {QuestService} from '../../services/quest.service';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  public _byGroups:boolean = false;
  public groups:any = null;
  public quests:any = null;
  public participants:any = null;
  public _selectedQuest:any = null;
  public _type:any = null;
  public _selectedGroup = null;
  constructor(private _us:UserService, private _qs:QuestService, private _router:Router) { }
  ngOnInit() {
  }

  public changeType(value:any):void{
    switch (Number.parseInt(value)) {
      case 1:
        this._type = value;
        this.getGroups();
        break;
      case 2:
        
        break;
    
      default:
        break;
    }
  }

  public  getGroups():void{
    let user = JSON.parse(localStorage.getItem('user')).register.id;
    this._us.getGroupsByUser(Number.parseInt(user)).then(data=>{
      this.groups = data["$values"]
      this._byGroups = true;
    }).catch(error=>{
      console.log(error);
    })
  }

  public getQuestsByGroup(group:number):void{
    this._selectedQuest  = group;
    this._selectedGroup = group;
    this._us.getQuestByGroup(group).then(data=>{
      this.quests = data["$values"];
    }).catch(error=>{
      console.log(error);
    })
  }

  public getParticipants(quest:number){
    let user = JSON.parse(localStorage.getItem('user')).register.id;
    this._qs.getParticipants(quest, user).then(data => {
      this.participants = data["$values"];
    }).catch(error=>{
      console.log(error);
      
    })
    
  }


  ourResults(quest:number):void{
    this._router.navigate(['results',1,quest, this._selectedGroup]);
  }


}
