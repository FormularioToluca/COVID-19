import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeaserPanelComponent } from './teaser-panel.component';
import { TeaserPanelItemComponent } from './teaser-panel-item/teaser-panel-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TeaserPanelComponent, TeaserPanelItemComponent],
  exports: [TeaserPanelComponent, TeaserPanelItemComponent]
})
export class TeaserPanelModule { }
