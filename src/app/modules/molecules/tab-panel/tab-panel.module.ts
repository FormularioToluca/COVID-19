import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabPanelComponent } from './tab-panel.component';
import { TabPanelItemDirective } from './tab-panel-item.directive';
import { TabPanelTitleDirective } from './tab-panel-title.directive';
import { NavigationModule } from '../navigation/navigation.module';
import { DropdownModule } from '../../atoms/dropdown/dropdown.module';
import { RouterModule } from '@angular/router';
import { TabPanelRouterOutletDirective } from './tab-panel-router-outlet.directive';

@NgModule({
  imports: [
    CommonModule,
    NavigationModule,
    DropdownModule,
    RouterModule
  ],
  declarations: [
    TabPanelComponent,
    TabPanelItemDirective,
    TabPanelTitleDirective,
    TabPanelRouterOutletDirective
  ],
  exports: [
    TabPanelComponent,
    TabPanelItemDirective,
    TabPanelTitleDirective
  ]
})
export class TabPanelModule { }
