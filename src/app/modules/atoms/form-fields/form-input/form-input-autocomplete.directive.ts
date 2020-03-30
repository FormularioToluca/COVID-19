import {
  AfterViewInit,
  ComponentFactoryResolver,
  Directive,
  HostListener,
  Inject,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { NEVER, Observable, of, Subject } from 'rxjs';
import { DropdownDirective } from '../../dropdown/dropdown.directive';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { catchError, debounceTime, skip, switchMap, takeUntil, tap } from 'rxjs/operators';
import { FormInputAutocompleteListComponent } from './form-input-autocomplete-list/form-input-autocomplete-list.component';
import { FormInputComponent } from './form-input.component';

@Directive({
  selector: '[rbFormInputAutocomplete]',
})
export class FormInputAutocompleteDirective extends DropdownDirective implements OnInit, OnDestroy, AfterViewInit {

  /**
   * Function that is called each time the value has changed.
   * It returns an observable, which result is provided to the dropdown list template
   */
  @Input() rbFormInputAutocomplete: (value: string) => Observable<string[]> | null;

  /**
   * A template which receives a context with the following properties:
   * - list: List of results
   * - active: The currently active value
   * - focus: The currently focused value
   * - select: The function to call with the selected value
   */
  @Input() rbAutocompleteList: TemplateRef<any>;

  /**
   * Should the dropdown open on initial click without any value change
   */
  @Input() rbInitialOpen = false;

  @Input() rbDebounceTime = 500;

  private destroy = new Subject();

  loading = false;

  error = null;

  private instance: FormInputAutocompleteListComponent;

  private lastResult = null;

  private focus = null;

  private input: FormInputComponent = null;

  private noSearchFor = null;

  constructor(private _factoryResolver: ComponentFactoryResolver,
              private injector: Injector,
              viewContainerRef: ViewContainerRef,
              @Self() private control: NgControl,
              @Self() @Optional() @Inject(NG_VALUE_ACCESSOR) inputs: FormInputComponent[]
  ) {
    super(_factoryResolver, viewContainerRef);
    if (inputs) {
      this.input = inputs[0];
    }
    this.openOnClick = false;
  }


  ngOnInit(): void {
    super.ngOnInit();

    if (this.rbInitialOpen) {
      this.openOnClick = true;
    }

    if (!this.rbAutocompleteList) {
      const factory = this._factoryResolver.resolveComponentFactory(FormInputAutocompleteListComponent);
      const component = factory.create(this.injector);
      this.instance = component.instance;
      this.rbAutocompleteList = component.instance.template;
    }

    this.template = this.rbAutocompleteList;

    this.updateLoading(false, null);

    let changes = 0;
    let resolvedValue = null;
    this.control.valueChanges.pipe(
      debounceTime(this.rbDebounceTime),
      switchMap(value => {
        changes++;
        if (changes === 1 && !this.rbInitialOpen || resolvedValue === value || this.noSearchFor === value) {
          return NEVER;
        }
        resolvedValue = value;
        this.updateLoading(true, null);
        const result = this.rbFormInputAutocomplete(value);
        if (result) {
          return result.pipe(
            tap(
              () => this.updateLoading(false, null),
              err => this.updateLoading(false, err),
              () => this.updateLoading(false, null)),
            catchError(err => of(null)),
            takeUntil(this.control.valueChanges.pipe(skip(1)))
          );
        } else {
          this.updateLoading(false, null);
          return of(null);
        }
      }),
      takeUntil(this.destroy)
    ).subscribe(results => {
      this.openOnClick = true;
      this.lastResult = results;
      if (results !== null && !results.includes(resolvedValue)) {
        this.focus = null;
      }
      this.updateContext(this.control.value);
      if (results !== null && (!this.componentRef || !this.componentRef.instance.shown) && changes > 1) {
        this.openDropdown();
      }
      if (results === null) {
        this.closeDropdown();
      }
    });

  }

  ngAfterViewInit(): void {
    if (this.input && this.input.input) {
      this.input.input.nativeElement.autocomplete = 'off';
    }
  }

  updateLoading(loading: boolean, error: any) {
    this.loading = loading;
    this.error = error;
    if (this.error) {
      const errors = this.control.errors || {};
      errors['autocomplete'] = this.error;
      this.control.control.setErrors(errors);
    }
    if (this.input && this.loading) {
      this.input.updateIcon('rb-ic rb-ic-spin rb-ic-refresh');
    }
    if (this.input && !this.loading) {
      this.input.updateIcon(this.rbInitialOpen ? 'select-icon rb-ic rb-ic-down' : null);
    }
    if (this.input && this.error) {
      this.input.updateIcon('rb-ic rb-ic-alert-warning u-TextColor--red');
    }
  }

  select(value: string) {
    this.noSearchFor = value;
    this.control.control.setValue(value);
    this.focus = value;
    this.closeDropdown();
    this.updateContext(value);
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(e: KeyboardEvent) {
    if (e.key === 'ArrowDown' || e.key === 'Down') {
      e.preventDefault();
      this.moveFocus(1);
    }
    if (e.key === 'ArrowUp' || e.key === 'Up') {
      e.preventDefault();
      this.moveFocus(-1);
    }
    if (e.key === 'Enter' && this.componentRef && this.componentRef.instance.shown) {
      e.preventDefault();
      this.select(this.focus);
    }
  }

  private moveFocus(by: number) {
    const list = this.lastResult || [];
    if (!list.length) {
      this.focus = null;
      this.updateContext(this.control.value);
      return;
    }
    let focusIndex = list.indexOf(this.focus);
    if (focusIndex === -1) {
      focusIndex = 0;
    } else {
      focusIndex += by;
      if (focusIndex === -1) {
        focusIndex = list.length - 1;
      }
      if (focusIndex === list.length) {
        focusIndex = 0;
      }
    }

    this.focus = list[focusIndex];
    this.updateContext(this.control.value);
  }

  private updateContext(value) {
    this.context = {
      list: this.lastResult,
      active: value,
      focus: this.focus,
      select: this.select.bind(this)
    };
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.destroy.complete();
    this.input = null;
  }
}
