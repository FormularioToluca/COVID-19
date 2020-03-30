import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Inject,
  Optional,
  Renderer2,
  Self
} from '@angular/core';
import { CUSTOM_VALUE_CONVERTER, CustomValueConverter, FormInputComponent } from '../form-input/form-input.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'rb-form-textarea',
  templateUrl: './form-textarea.component.html',
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FormTextareaComponent), multi: true}],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormTextareaComponent extends FormInputComponent {

  constructor(renderer: Renderer2, elementRef: ElementRef,
              @Optional() @Self() @Inject(CUSTOM_VALUE_CONVERTER) valueConverter: CustomValueConverter,
              cd: ChangeDetectorRef) {
    super(renderer, elementRef, valueConverter, cd);
  }

}
