import { ChangeDetectorRef, Component, ElementRef, forwardRef, Inject, Optional, Renderer2, Self } from '@angular/core';
import { CUSTOM_VALUE_CONVERTER, CustomValueConverter, FormInputComponent } from '../form-input/form-input.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'rb-form-select',
  templateUrl: './form-select.component.html',
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FormSelectComponent), multi: true}]
})
export class FormSelectComponent extends FormInputComponent {

  constructor(renderer: Renderer2,
              elementRef: ElementRef,
              @Optional() @Self() @Inject(CUSTOM_VALUE_CONVERTER) valueConverter: CustomValueConverter,
              cd: ChangeDetectorRef) {
    super(renderer, elementRef, valueConverter, cd);
  }

}
