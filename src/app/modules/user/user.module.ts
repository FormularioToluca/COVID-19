import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import { UserRoutingModule } from './user-routing.module';
import { LandingPageComponent } from './comps/landing-page/landing-page.component';
import { AnsweringComponent } from './comps/answering/answering.component';
import { ResultsComponent } from './comps/results/results.component';
import { ChartsComponent } from './comps/charts/charts.component';
import { WordArtComponent } from './comps/word-art/word-art.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [LandingPageComponent, AnsweringComponent, ResultsComponent, ChartsComponent, WordArtComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ]
})
export class UserModule { }
