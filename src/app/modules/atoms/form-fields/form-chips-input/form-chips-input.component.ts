import { Component,
        forwardRef,
        Input,
        Output,
        EventEmitter,
        TemplateRef,
        Renderer2,
        ElementRef,
        ContentChildren,
        QueryList,
        ViewChild,
        HostListener
       } from '@angular/core';
import { FormValidationMessageDirective } from '../form-validation-message.directive';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { emptyFunction } from '../forms-util';

@Component({
  selector: 'rb-form-chips-input',
  templateUrl: './form-chips-input.component.html',
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FormChipsInputComponent), multi: true}]
})
export class FormChipsInputComponent implements ControlValueAccessor {

  chips: string[] = [];
  chipInput = '';
  id = 'input.' + Math.random();
  disabled = false;
  activeIndex = null;
  private mouseIn = false;
  deletingLast = false;

  @Input() label: string | TemplateRef<any> = null;

  @Input() placeholder = '';

  @Input()
  set setFocus(val: string) {
    if (this.input && 'nativeElement' in this.input) {
      this.input.nativeElement.focus();
    }
  }

  @Output() chipAdded = new EventEmitter<string>();
  @Output() chipDeleted = new EventEmitter<string>();

  @ContentChildren(FormValidationMessageDirective) messages: QueryList<FormValidationMessageDirective>;
  @ViewChild('input', { static: true }) input: ElementRef;
  @ViewChild('chipcontainer', { static: false }) chipcontainer: ElementRef;

  onChange = emptyFunction;
  onTouched = emptyFunction;

  @HostListener('mouseenter') onMouseEnter() {
    this.mouseIn = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.mouseIn = false;
  }

  @HostListener('window:click') onAnyClick() {
    if (this.activeIndex !== null && !this.mouseIn) {
      this.activeIndex = null;
    }
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
      if (this.activeIndex !== null && !this.deletingLast && event.key === 'Backspace') {
        event.preventDefault();
        this.removeAtIndex(this.activeIndex);
      }
  }

  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  isLabelTemplate() {
    return this.label instanceof TemplateRef;
  }

  writeValue(value: any): void {
    this.chips = value || [];
    this.checkState();
    this.renderer.setProperty(this.input.nativeElement, 'value', '');
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.renderer.setProperty(this.input.nativeElement, 'disabled', isDisabled);
  }

  checkState() {
    if (this.chips && this.chips.length > 0) {
      this.renderer.addClass(this.elementRef.nativeElement, 'not-empty');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'not-empty');
    }
  }

  submit() {
    if (this.chipInput !== '') {
      this.addChip(this.chipInput);
      this.chipInput = '';
    }
  }

  onKeyDown(e) {
    if (e.key === 'Backspace' && this.chipInput === '') {
      e.preventDefault();
      if (this.activeIndex !== null) {
         this.removeLast();
         this.checkState();
      } else {
        this.deletingLast = true;
        this.activeIndex = this.chips.length - 1;
      }
    }
  }

  onBlur() {
    if (this.chipInput !== '') {
      this.addChip(this.chipInput);
      this.chipInput = '';
    }
    this.onTouched();
  }

  addChip(chip: string) {
    this.chips.push(chip.trim());
    this.onChange(this.chips);
    this.checkState();
    this.chipAdded.next(chip);
  }

  removeChip(chip: string) {
    const index = this.chips.indexOf(chip);
    if (index !== -1) {
      this.chips.splice(index, 1);
      this.onChange(this.chips);
      this.checkState();
      this.chipDeleted.next(chip);
    }
  }

  removeLast() {
    const lastChip = this.chips[this.chips.length - 1];
    this.chips.splice(-1, 1);
    this.activeIndex = null;
    this.deletingLast = false;
    this.onChange(this.chips);
    this.chipDeleted.next(lastChip);
  }

  removeAtIndex(i: number) {
    const chipAtIndex = this.chips[i];
    this.chips.splice(i, 1);
    this.activeIndex = null;
    this.onChange(this.chips);
    this.chipDeleted.next(chipAtIndex);
  }

}
