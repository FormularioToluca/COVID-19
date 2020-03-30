import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingPageComponent} from './comps/landing-page/landing-page.component';
import {AnsweringComponent} from './comps/answering/answering.component';
import {ResultsComponent} from './comps/results/results.component';
const routes: Routes = [
  { path: 'home', component: LandingPageComponent },
  {path:'answering/:type/:quest/:participant', component: AnsweringComponent},
  {path:'results/:type/:quest/:participant', component:ResultsComponent},
  {path:'results/:type/:quest/:participant/question/:question/close', component:ResultsComponent},
  {path:'results/:type/:quest/:participant/question/:question/open', component:ResultsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
