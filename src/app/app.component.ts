import { Component } from '@angular/core';
import {AuthService} from './modules/user/services/auth.service';
import * as Highcharts from 'highcharts';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'covid19';
  constructor(private _auth:AuthService, private _router:Router){
    this._router.navigate(['formulario']);
    // _auth.authUser().then(data=>{
      
    // }).catch(error=>{
    //   console.log(error);

      
    // })
  }
}
