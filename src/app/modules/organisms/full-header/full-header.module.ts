import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullHeaderComponent } from './full-header.component';
import {
  MainNavItemsDirective, SubNavItemsDirective, MetaNavItemsDirective,
  ActionNavItemsDirective
} from './navigation/navigation.directive';
import { LogoHeaderDirective, SubBrandHeaderDirective } from './full-header.directive';
import { NavigationModule } from '../../molecules/navigation/navigation.module';

@NgModule({
  imports: [
    CommonModule,
    NavigationModule,
  ],
  declarations: [
    FullHeaderComponent,
    MainNavItemsDirective,
    SubNavItemsDirective,
    MetaNavItemsDirective,
    SubBrandHeaderDirective,
    LogoHeaderDirective,
    ActionNavItemsDirective
  ],
  exports: [
    FullHeaderComponent,
    MainNavItemsDirective,
    SubNavItemsDirective,
    MetaNavItemsDirective,
    SubBrandHeaderDirective,
    LogoHeaderDirective,
    ActionNavItemsDirective
  ]
})
export class FullHeaderModule {
}
