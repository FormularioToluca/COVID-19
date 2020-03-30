import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown.component';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DropdownComponent, DropdownDirective],
  entryComponents: [DropdownComponent],
  exports: [DropdownComponent, DropdownDirective]
})
export class DropdownModule {
}
