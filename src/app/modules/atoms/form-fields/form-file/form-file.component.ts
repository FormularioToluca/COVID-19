import {
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { FormValidationMessageDirective } from '../form-validation-message.directive';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { emptyFunction } from '../forms-util';


@Component({
  selector: 'rb-form-file',
  templateUrl: './form-file.component.html',
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FormFileComponent), multi: true}]
})
export class FormFileComponent implements ControlValueAccessor {

  @Input() label: string | TemplateRef<any> = null;
  @Input() name: string;
  @Input() placeholder = '';

  @Output() filesChange = new EventEmitter<File[]>();

  id = 'file.' + Math.random();
  @Input() accept: string;
  @Input() multiple;

  @ViewChild('file', { static: true }) file: ElementRef;
  @ContentChildren(FormValidationMessageDirective) messages: QueryList<FormValidationMessageDirective>;

  onChange = emptyFunction;
  onTouched = emptyFunction;

  filePreview = '';

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
  }

  checkSelectedFiles() {

    const fileNames = [];
    const files: File[] = [];
    for (let i = 0; i < this.file.nativeElement.files.length; i++) {
      const file: File = this.file.nativeElement.files[i];
      files.push(file);
      if (file.name) {
        fileNames.push(file.name);
      }
    }

    if (files.length === 0) {
      this.renderer.removeClass(this.elementRef.nativeElement, 'not-empty');
    } else {
      this.renderer.addClass(this.elementRef.nativeElement, 'not-empty');
    }

    this.filePreview = fileNames.join(', ');
    if (this.filePreview.length > 100) {
      this.filePreview = this.filePreview.substr(0, 97) + '... (' + fileNames.length + ')';
    }

    console.log('files', files);

    this.onChange(files);

  }

  isLabelTemplate() {
    return this.label instanceof TemplateRef;
  }

  writeValue(value: any): void {
    // console.warn('unsupported write to rb-form-file', value);
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.file.nativeElement, 'disabled', isDisabled);
  }

}
