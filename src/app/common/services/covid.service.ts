import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor(private firestore: AngularFirestore) { }

  registerAnswers(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("suvery")
        .add(data)
        .then(res => { resolve(res) }, err => reject(err));
    });
  }


  getAnswers(data:any) {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection("suvery", ref => ref.where('date','==',data.date)).valueChanges().subscribe(val=>{
        resolve(val)
      }, error=>{reject(error)})

    })
  }
}
