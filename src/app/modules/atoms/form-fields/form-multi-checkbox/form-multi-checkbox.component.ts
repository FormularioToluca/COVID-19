import {
  Component, ContentChildren,
  ElementRef,
  forwardRef,
  Input,
  OnChanges,
  OnInit, QueryList,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormValidationMessageDirective } from '../form-validation-message.directive';
import { emptyFunction } from '../forms-util';


@Component({
  selector: 'rb-form-multi-checkbox',
  templateUrl: './form-multi-checkbox.component.html',
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FormMultiCheckboxComponent), multi: true}]
})
export class FormMultiCheckboxComponent implements OnInit, OnChanges, ControlValueAccessor {

  id = 'multiCheckbox.' + Math.random();

  @Input() name: string;
  @Input() label: string | TemplateRef<any> = null;

  state = null;

  @Input() numStates = 2;

  @ViewChild('input', { static: true }) input: ElementRef;

  @ContentChildren(FormValidationMessageDirective) messages: QueryList<FormValidationMessageDirective>;

  stateLabels = ['stateNull', 'stateTrue', 'stateFalse'];
  statesValues = [null, true, false];
  stateLabel = this.stateLabels[0];

  @ViewChild('labelElement', { static: true }) labelElement: ElementRef;

  onChange = emptyFunction;
  onTouched = emptyFunction;

  constructor(private renderer: Renderer2) {
  }


  ngOnInit() {
    if (this.numStates === 2) {
      this.stateLabels = ['stateNull', 'stateTrue'];
      this.statesValues = [false, true];
      if (this.statesValues.indexOf(this.state) === -1) {
        this.state = this.statesValues[0];
      }
    }
    this.setState(this.state);
  }

  isLabelTemplate() {
    return this.label instanceof TemplateRef;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.state && !changes.state.firstChange) {
      this.state = changes.state.currentValue;
      this.setState(this.state);
    }
  }

  setState(stateValue) {
    const index = this.statesValues.indexOf(stateValue);
    this.stateLabel = this.stateLabels[index];

    this.renderer.setProperty(this.input.nativeElement, 'checked', this.stateLabel !== 'stateNull');
  }

  toggleState() {
    const index = this.stateLabels.indexOf(this.stateLabel);
    const newIndex = (index + 1) % this.stateLabels.length;
    this.state = this.statesValues[newIndex];
    this.setState(this.state);
    this.onChange(this.state);
  }

  writeValue(value: any): void {
    this.setState(value);
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.input.nativeElement, 'disabled', isDisabled);
  }

}
