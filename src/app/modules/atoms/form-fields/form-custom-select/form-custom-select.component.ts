import {
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  forwardRef,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormValidationMessageDirective } from '../form-validation-message.directive';
import { emptyFunction } from '../forms-util';
import { MultiSelectOptionDirective, MultiSelectTitleDirective } from '../form-multi-select/form-multi-select.component';
import { Subject } from 'rxjs';
import { FORM_SELECT_SELECTOR, FormSelectAction } from './form-custom-select.model';
import { FormSelectOptionComponent } from './form-select-option/form-select-option.component';

export function customSelectSelectorFactory() {
  return new Subject<FormSelectAction>();
}

/**
 * This component offers a select field, that can be heavily customized.
 * The easy way would to just add options like this:
 * <rb-form-select-option [value]=""></rb-form-select-option>
 *
 * But you can also provide a selectionTpl which is a ng-template that is used to show the options in the dropdown.
 * It gets a context, that contains a select() function that can be used to provide the value for the ngModel.
 */
@Component({
  selector: 'rb-form-custom-select',
  templateUrl: './form-custom-select.component.html',
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FormCustomSelectComponent), multi: true},
    {provide: FORM_SELECT_SELECTOR, useFactory: customSelectSelectorFactory}
  ]
})
export class FormCustomSelectComponent implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {

  @Input() name: string;

  @Input() label: string | TemplateRef<any> = null;
  id = 'customSelectValue.' + Math.random();
  disabled: boolean;

  @Input() selectionTpl: TemplateRef<any> = null;
  @Input() autoClose = true;

  @ContentChildren(FormValidationMessageDirective) messages: QueryList<FormValidationMessageDirective>;

  private isMouseOver = false;

  @ContentChild(MultiSelectOptionDirective, {static: false}) option: MultiSelectOptionDirective;
  @ContentChild(MultiSelectTitleDirective, {static: false}) title: MultiSelectTitleDirective;
  @ContentChildren(FormSelectOptionComponent) options: QueryList<FormSelectOptionComponent>;

  @ViewChild('activeElement', {static: true}) activeElement: ElementRef;

  onChange = emptyFunction;
  onTouched = emptyFunction;

  updateValue;

  private selectSub;

  private value = null;

  constructor(private renderer: Renderer2,
              private elementRef: ElementRef,
              @Inject(FORM_SELECT_SELECTOR) private selectSubject: Subject<FormSelectAction>) {
    this.updateValue = value => {
      this.value = value;
      this.onChange(value);
      this.checkValue(value);
    };
  }

  ngOnInit() {
    this.selectSub = this.selectSubject.subscribe(action => {
      if (action.type === 'update') {
        this.updateValue(action.value);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.selectSub) {
      this.selectSub.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.updateCurrentLabel(this.value);
  }

  isLabelTemplate() {
    return this.label instanceof TemplateRef;
  }

  @HostListener('mouseenter') mouseover() {
    this.isMouseOver = true;
  }

  @HostListener('mouseleave') mouseleave() {
    this.isMouseOver = false;
  }

  writeValue(value: any): void {
    this.value = value;
    this.selectSubject.next({type: 'write', value});
    this.checkValue(value);
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  checkValue(value) {
    if (typeof (value) === 'string' && value.length > 0 || typeof (value) === 'number' || typeof (value) === 'boolean' || value) {
      this.renderer.addClass(this.elementRef.nativeElement, 'not-empty');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'not-empty');
    }

    this.updateCurrentLabel(value);


  }

  updateCurrentLabel(value) {
    if (this.options && this.options.length) {
      const opt = this.options.find(item => item.value === value);
      if (opt) {
        this.activeElement.nativeElement.innerHTML = opt.content.nativeElement.innerHTML;
      }
    }
  }

}
