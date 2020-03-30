import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { QuestService } from '../../services/quest.service';
import { GroupService } from '../../services/group.service';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-answering',
  templateUrl: './answering.component.html',
  styleUrls: ['./answering.component.scss']
})
export class AnsweringComponent implements OnInit {
  public _quest = null;
  public _questions = null;
  public _participant = null;
  public _ready = false;
  public _model: any =[];
  public _errors:any = [];
  constructor(private _toast: ToastrService,private _activated: ActivatedRoute, private _qs: QuestService, private _gs: GroupService, private _location:Location) { }

  ngOnInit() {
    console.log(this._activated.snapshot.params);
    this._qs.getQuestBody(this._activated.snapshot.params.quest).then(data => {
      this._quest = data["item1"]
      this._questions = data["item2"]["$values"]
      this.prepareModel();
      this.getParticipant();      
    }).catch(error => {
      console.log(error);

    })
  }


  getParticipant(): void {
    let type = this._activated.snapshot.params.type;
    if (type == 1) {
      this.getGroup()
    }
  }

  getGroup(): void {
    this._gs.getGroup(this._activated.snapshot.params.participant).then(data => {
      this._participant = data;
      this._ready = true;
      console.log(data);

    }).catch(err => {
      console.log(err);

    })
  }

  replace(body: string, fillable: boolean): string {
    let bd = body;
    if (fillable) {
      bd = body.replace("XXX", this._participant.name)
    }
    return bd;
  }


  prepareModel():void{
    this._questions.forEach(element => {
      console.log('e',element.item2.$values);
      if(element.item2.$values[0].body != null){
        this._model.push(0);
        this._errors.push(null);
      }else{
        let palabras = []
        let r = [];
        element.item2.$values.forEach(() => {
          palabras.push('');
          r.push(null);
        });
        this._errors.push(Object.assign([], r)); 
        this._model.push(Object.assign([],palabras));
      }
    });
  }

  save():void{
    if(this.verifyData()){
      this.transformAns();
      let answers = this.normalizeData();
      let data ={
        user:JSON.parse(localStorage.getItem('user')).register.id,
        type:this._activated.snapshot.params.quest,
        quest: this._quest,
        participant: this._participant,
        answers: answers
      }
      console.log(data);
      this._qs.postAnswers(data).then(success=>{
        this.showSuccess(`Se ha registrado la evaluación para: ${this._participant.name}`);
        this._location.back();
      }).catch(error=>{
        console.log(error);
        
      })
    }
    
  }

  verifyData():boolean{
    let flag = true;
    this._model.forEach((item, index) => {
      if(typeof(item) == 'number'){
        if(item == 0 || item == null){
          this._errors[index] = 'Por favor seleccione una opción.';
          flag = false;
        }else{
          this._errors[index] = null;
        }
      }else{
        item.forEach((field, j) => {
          if(field == '' || field == null){
            this._errors[index][j]= 'Porfavor rellene todos los campos';
            flag = false;
          }else{
            this._errors[index][j]= null;
          }
        });
      }
    });
    return flag;
  }

  transformAns():void{
    this._model.forEach((i,index) => {
      if(typeof(i) != 'number'){
        i.forEach((element, j) => {
          let temp =  element.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          this._model[index][j] = temp.toString().toUpperCase();
        });
      }
    });
  }


  normalizeData():any{
    let normilized = [];
    this._questions.forEach((item,index) => {
      let temp = (typeof(this._model[index]) == 'number')?1:2
      normilized.push({
        question: item.item1.id,
        answers: this._model[index],
        type:temp
      })
    });
    return normilized;
  }

  close():void{
    this._location.back();
  }

  showSuccess(msg:string) {
    this._toast.success(msg);
  }
}
