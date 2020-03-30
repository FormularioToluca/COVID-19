import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from './form-input/form-input.component';
import { FormsModule } from '@angular/forms';
import { FormValidationMessageDirective } from './form-validation-message.directive';
import { FormCheckboxComponent } from './form-checkbox/form-checkbox.component';
import { IconModule } from '../icon/icon.module';
import { FormSelectComponent } from './form-select/form-select.component';
import { FormTextareaComponent } from './form-textarea/form-textarea.component';
import {
  FormMultiSelectComponent,
  MultiSelectOptionDirective,
  MultiSelectTitleDirective
} from './form-multi-select/form-multi-select.component';
import { FormMultiCheckboxComponent } from './form-multi-checkbox/form-multi-checkbox.component';
import { DropdownModule } from '../dropdown/dropdown.module';
import { FormFileComponent } from './form-file/form-file.component';
import { FormErrorsComponent } from './form-errors/form-errors.component';
import { FormCheckboxRequiredValidatorDirective } from './validators/form-checkbox-required-validator.directive';
import { FormFileValidatorDirective } from './validators/form-file-validator.directive';
import { FormCustomSelectComponent } from './form-custom-select/form-custom-select.component';
import { FormChipsInputComponent } from './form-chips-input/form-chips-input.component';
import { FormChipsInputPatternValidatorDirective } from './validators/form-chips-input-pattern-validator.directive';
import { NumberConverterDirective } from './converters/number-converter.directive';
import { JsonConverterDirective } from './converters/json-converter.directive';
import { FormSelectOptionComponent } from './form-custom-select/form-select-option/form-select-option.component';
import { FormInputAutocompleteDirective } from './form-input/form-input-autocomplete.directive';
import { FormInputAutocompleteListComponent } from './form-input/form-input-autocomplete-list/form-input-autocomplete-list.component';
import { FormRadioComponent } from './form-radio/form-radio.component';
import { FormNumberValidatorDirective } from './validators/form-number-validator.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IconModule,
    DropdownModule
  ],
  declarations: [
    FormInputComponent,
    FormValidationMessageDirective,
    FormCheckboxComponent,
    FormRadioComponent,
    FormSelectComponent,
    FormTextareaComponent,
    FormMultiSelectComponent,
    FormMultiCheckboxComponent,
    MultiSelectTitleDirective,
    MultiSelectOptionDirective,
    FormFileComponent,
    FormErrorsComponent,
    FormCheckboxRequiredValidatorDirective,
    FormFileValidatorDirective,
    FormCustomSelectComponent,
    FormChipsInputComponent,
    FormChipsInputPatternValidatorDirective,
    NumberConverterDirective,
    JsonConverterDirective,
    FormSelectOptionComponent,
    FormInputAutocompleteDirective,
    FormInputAutocompleteListComponent,
    FormNumberValidatorDirective
  ],
  entryComponents: [
    FormInputAutocompleteListComponent
  ],
  exports: [
    FormInputComponent,
    FormValidationMessageDirective,
    FormRadioComponent,
    FormCheckboxComponent,
    FormSelectComponent,
    FormTextareaComponent,
    FormMultiSelectComponent,
    FormMultiCheckboxComponent,
    MultiSelectTitleDirective,
    MultiSelectOptionDirective,
    FormFileComponent,
    FormCheckboxRequiredValidatorDirective,
    FormFileValidatorDirective,
    FormCustomSelectComponent,
    FormChipsInputComponent,
    FormChipsInputPatternValidatorDirective,
    NumberConverterDirective,
    JsonConverterDirective,
    FormSelectOptionComponent,
    FormErrorsComponent,
    FormInputAutocompleteDirective,
    FormNumberValidatorDirective
  ]
})
export class FormFieldsModule {
}
