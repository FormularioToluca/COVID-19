import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from './popover.component';
import { PopoverDirective } from './popover.directive';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PopoverComponent, PopoverDirective, TooltipDirective],
  exports: [PopoverComponent, PopoverDirective, TooltipDirective],
  entryComponents: [PopoverComponent]
})
export class PopoverModule { }
