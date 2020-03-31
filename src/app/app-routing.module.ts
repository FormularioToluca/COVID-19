import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ErrorComponent} from './common/error/error.component';
import { FormularioCovid19Component } from './formulario-covid19/formulario-covid19.component'
import {ReportesComponent} from './reportes/reportes.component';
const routes: Routes = [
  {path:'formulario',component:FormularioCovid19Component},
  {path:'reportes', component:ReportesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
