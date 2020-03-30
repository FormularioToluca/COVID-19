import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ErrorComponent} from './common/error/error.component';
import { FormularioCovid19Component } from './formulario-covid19/formulario-covid19.component'

const routes: Routes = [
  {path:'formulario',component:FormularioCovid19Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
