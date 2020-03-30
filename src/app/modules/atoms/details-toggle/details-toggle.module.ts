import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsToggleDirective } from './details-toggle.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DetailsToggleDirective],
  exports: [DetailsToggleDirective]
})
export class DetailsToggleModule {
}
