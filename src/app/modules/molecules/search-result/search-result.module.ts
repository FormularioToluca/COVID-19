import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultItemComponent } from './search-result-item/search-result-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SearchResultItemComponent
  ],
  exports: [
    SearchResultItemComponent
  ]
})
export class SearchResultModule { }
