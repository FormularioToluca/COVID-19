import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardItemComponent } from './board-item.component';
import { BoardItemBodyDirective, BoardItemCountDirective, BoardItemIconDirective } from './board-item.directive';
import { IconModule } from '../../atoms/icon/icon.module';

@NgModule({
  imports: [
    CommonModule,
    IconModule
  ],
  declarations: [
    BoardItemComponent,
    BoardItemIconDirective,
    BoardItemBodyDirective,
    BoardItemCountDirective
  ],
  exports: [
    BoardItemComponent,
    BoardItemIconDirective,
    BoardItemBodyDirective,
    BoardItemCountDirective
  ]
})
export class BoardItemModule {
}
