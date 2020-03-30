import { ChangeDetectorRef, Component, DoCheck, Input, OnDestroy, OnInit, Optional, QueryList } from '@angular/core';
import { NgControl } from '@angular/forms';
import { FormValidationMessageDirective } from '../form-validation-message.directive';

@Component({
  selector: 'rb-form-errors',
  templateUrl: './form-errors.component.html'
})
export class FormErrorsComponent implements OnInit, OnDestroy, DoCheck {

  @Input() messages: QueryList<FormValidationMessageDirective>;

  errors = [];

  private sub;

  constructor(@Optional() public control: NgControl,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (this.control) {
      this.sub = this.control.statusChanges.subscribe(value => {
        this.errors = this.getErrors();
        this.cd.markForCheck();
      });
    }

  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngDoCheck(): void {
    this.errors = this.getErrors();
  }

  getErrors() {
    const errors = [];
    if (this.control && this.control.errors && (this.control.touched || this.control.dirty)) {
      const errorKeys = Object.keys(this.control.errors);
      for (const key of errorKeys) {
        const message = this.messages.find(item => item.name === key);
        if (message && (message.onTouched || !message.onTouched && this.control.dirty)) {
          errors.push({
            name: key,
            data: this.control.errors[key],
            message: message.templateRef
          });
        }
      }
    }
    return errors;
  }

  getItemName(i, item) {
    return item.name;
  }

}
