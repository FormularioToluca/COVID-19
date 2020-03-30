import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSelectorComponent } from './language-selector.component';
import { DropdownModule } from '../../atoms/dropdown/dropdown.module';
import { IconModule } from '../../atoms/icon/icon.module';

@NgModule({
  imports: [
    CommonModule,
    DropdownModule,
    IconModule
  ],
  declarations: [LanguageSelectorComponent],
  exports: [LanguageSelectorComponent]
})
export class LanguageSelectorModule { }
