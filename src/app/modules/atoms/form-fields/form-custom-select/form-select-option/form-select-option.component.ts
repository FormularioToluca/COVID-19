import { Component, ElementRef, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FORM_SELECT_SELECTOR, FormSelectAction } from '../form-custom-select.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'rb-form-select-option',
  templateUrl: './form-select-option.component.html'
})
export class FormSelectOptionComponent implements OnInit, OnDestroy {

  @Input() value;

  active = false;

  private sub;

  @ViewChild('innerLink', { static: true }) content: ElementRef;

  constructor(@Inject(FORM_SELECT_SELECTOR) private selectSubject: Subject<FormSelectAction>,
              public elementRef: ElementRef) {

  }

  ngOnInit(): void {
    this.sub = this.selectSubject.subscribe(action => {
      this.active = action.value === this.value;
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  select() {
    this.selectSubject.next({type: 'update', value: this.value});
  }

}
