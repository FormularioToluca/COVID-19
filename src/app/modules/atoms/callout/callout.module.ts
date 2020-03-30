import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalloutComponent } from './callout.component';
import { IconModule } from '../icon/icon.module';

@NgModule({
  imports: [
    CommonModule,
    IconModule
  ],
  declarations: [CalloutComponent],
  exports: [CalloutComponent]
})
export class CalloutModule { }
