import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDateInputComponent } from './form-date-input/form-date-input.component';
import { FormsModule } from '@angular/forms';
import { IconModule } from '../icon/icon.module';
import { DropdownModule } from '../dropdown/dropdown.module';
import { FormDateRangeInputComponent } from './form-date-range-input/form-date-range-input.component';
import { FormFieldsModule } from '../form-fields/form-fields.module';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import { TabPanelModule } from '../../molecules/tab-panel/tab-panel.module';
import { RelativeTimeInputComponent } from './form-relative-time-input/relative-time-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IconModule,
    DropdownModule,
    FormFieldsModule,
    TabPanelModule
  ],
  declarations: [
    FormDateInputComponent,
    FormDateRangeInputComponent,
    DateRangePickerComponent,
    RelativeTimeInputComponent
  ],
  exports: [
    FormDateInputComponent,
    FormDateRangeInputComponent,
    DateRangePickerComponent,
    RelativeTimeInputComponent
  ]
})
export class FormDateFieldsModule { }
