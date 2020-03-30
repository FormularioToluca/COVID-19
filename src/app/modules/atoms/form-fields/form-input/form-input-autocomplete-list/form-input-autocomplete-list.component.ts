import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'rb-form-input-autocomplete-list',
  templateUrl: './form-input-autocomplete-list.component.html'
})
export class FormInputAutocompleteListComponent {

  @ViewChild('tpl', {static: true}) template: TemplateRef<any>;

}
