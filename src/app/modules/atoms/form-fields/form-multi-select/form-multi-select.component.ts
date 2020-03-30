import {
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  OnInit,
  QueryList,
  Renderer2,
  TemplateRef
} from '@angular/core';
import { FormValidationMessageDirective } from '../form-validation-message.directive';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { emptyFunction } from '../forms-util';
import { TabPanelTitleDirective } from '../../../molecules/tab-panel/tab-panel-title.directive';

@Directive({
  selector: '[rbFormMultiSelectOption]'
})
export class MultiSelectOptionDirective {

  constructor(public templateRef: TemplateRef<any>) {
  }

}

@Directive({
  selector: '[rbFormMultiSelectTitle]'
})
export class MultiSelectTitleDirective {

  constructor(public templateRef: TemplateRef<any>) {
  }

}

export interface ItemWithState {
  item: any;
  state: any;
}

export interface StateValues {
  [key: string]: any;
}

export interface TitleContext {
  $implicit: ItemWithState[];
  count: number;
  firstItem: ItemWithState;
  states: any;
}

/**
 * Use this component to have multiple selections.
 * The value is a map of id -> state.
 * The items are an array of objects.
 * To identify the id of an object from the items array, provide the idField.
 */
@Component({
  selector: 'rb-form-multi-select',
  templateUrl: './form-multi-select.component.html',
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FormMultiSelectComponent), multi: true}]
})
export class FormMultiSelectComponent implements OnInit, ControlValueAccessor {

  @Input() name: string;
  @Input() label: string | TemplateRef<any> = null;
  id = 'multiSelect.' + Math.random();
  disabled: boolean;
  @Input() selectAllLabel = 'Select all';

  @ContentChildren(FormValidationMessageDirective) messages: QueryList<FormValidationMessageDirective>;

  _items: ItemWithState[];

  private isMouseOver = false;

  /**
   * Property name of the property that contains the unique value of an item
   * Otherwise the JSON rep is used as value
   */
  @Input() idField: string = null;

  /**
   * What states should be offered per item
   * check: just checked(true) and unchecked(false)
   * optCheck: unchecked(null), include(true), exclude(false)
   */
  @Input() statesMode: 'check' | 'optCheck' = 'check';

  numStates = 2;

  private _states = {
    'check': [false, true],
    'optCheck': [null, false, true]
  };

  @Input() maxItemsPreview = 3;

  @ContentChild(MultiSelectOptionDirective, {static: false}) option: MultiSelectOptionDirective;
  @ContentChild(MultiSelectTitleDirective, {static: false}) title: MultiSelectTitleDirective;

  allStates = null;

  private countNotDefState = 0;

  private firstNotDefStateItem: ItemWithState = null;

  private _value: StateValues = {};

  titleContext: TitleContext = {
    $implicit: null,
    count: 0,
    firstItem: null,
    states: null
  };

  getItemTrackId;

  onChange = emptyFunction;
  onTouched = emptyFunction;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {

    this.getItemTrackId = (i, item) => {
      return this.getItemId(item.item);
    };
  }

  ngOnInit() {
    const states = this.getStates();
    this.numStates = states.length;
    this.allStates = states[0];
  }

  isLabelTemplate() {
    return this.label instanceof TemplateRef;
  }


  @Input()
  set items(items: object[]) {
    const states = this.getStates();
    this._items = items.map(item => {
      const id = this.getItemId(item);
      let state = states[0];
      if (this._value && this._value[id] !== undefined) {
        state = this._value[id];
      }
      return {
        item: item,
        state: state
      };
    });
    this.doOnChanges();
  }

  getItemId(item: any) {
    if (this.idField && item) {
      return item[this.idField];
    } else {
      return JSON.stringify(item);
    }
  }

  getStates() {
    return this._states[this.statesMode];
  }


  allStatesChange(state) {
    this.allStates = state;
    if (!this._items) {
      return;
    }
    this._items.forEach(item => {
      item.state = state;
    });
    this.notifyChanges();
  }

  updateStateOfItem(item: ItemWithState, state) {
    item.state = state;
    if (this._items.some(d => d.state !== state)) {
      const states = this.getStates();
      this.allStates = states[0];
    } else {
      this.allStates = state;
    }
    this.notifyChanges();
  }

  getCurrentStatesObject() {
    const states = {};
    this._items.forEach(item => {
      const id = this.getItemId(item.item);
      states[id] = item.state;
    });
    return states;
  }

  doOnChanges() {
    this.firstNotDefStateItem = null;
    this.countNotDefState = 0;
    const states = this.getStates();
    if (!this._items) {
      return;
    }
    this._items.forEach(item => {
      if (item.state !== states[0]) {
        this.countNotDefState++;
        if (this.firstNotDefStateItem === null) {
          this.firstNotDefStateItem = item;
        }
      }
    });

    this.titleContext = {
      $implicit: this._items,
      count: this.countNotDefState,
      firstItem: this.firstNotDefStateItem,
      states: this._value
    };

    if (this.countNotDefState === 0 && this.selectAllLabel === '') {
      this.renderer.removeClass(this.elementRef.nativeElement, 'not-empty');
    } else {
      this.renderer.addClass(this.elementRef.nativeElement, 'not-empty');
    }

  }

  notifyChanges() {
    this.doOnChanges();
    this.onChange(this.getCurrentStatesObject());
  }

  @HostListener('mouseenter') mouseover() {
    this.isMouseOver = true;
  }

  @HostListener('mouseleave') mouseleave() {
    this.isMouseOver = false;
  }

  writeValue(items: any): void {
    this._value = items;
    if (items) {
      const states = this.getStates();
      this._items.forEach(item => {
        const id = this.getItemId(item.item);
        if (items[id] !== undefined) {
          item.state = items[id];
        } else {
          item.state = states[0];
        }
      });
    }
    this.doOnChanges();
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

}
