import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMultiSelectComponent, StateValues } from './form-multi-select.component';
import { DropdownModule } from '../../dropdown/dropdown.module';
import { FormMultiCheckboxComponent } from '../form-multi-checkbox/form-multi-checkbox.component';
import { IconModule } from '../../icon/icon.module';
import { By } from '@angular/platform-browser';
import { FormErrorsComponent } from '../form-errors/form-errors.component';
import { FormsModule, NgModel } from '@angular/forms';
import { Component } from '@angular/core';
import { DropdownComponent } from '../../dropdown/dropdown.component';

@Component({
  template: `
    <rb-form-multi-select [ngModel]="value" (ngModelChange)="updateValue($event)" name="test"></rb-form-multi-select>`
})
class TestHostComponent {
  value = null;

  updateValue(value) {
  }
}

describe('FormMultiSelectComponent', () => {
  let testHost: TestHostComponent;
  let component: FormMultiSelectComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  const multiSelectOptions = [
    {id: 'a', label: 'Option A'},
    {id: 'b', label: 'Option B'},
    {id: 'c', label: 'Option C'},
    {id: 'd', label: 'Option D'}
  ];

  const selectedStates = {
    a: true,
    c: false
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DropdownModule, IconModule, FormsModule],
      declarations: [FormMultiSelectComponent, TestHostComponent, FormMultiCheckboxComponent, FormErrorsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(FormMultiSelectComponent)).componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have items', async () => {
    component.items = multiSelectOptions;
    component.idField = 'id';
    fixture.detectChanges();
    const labelButton = fixture.debugElement.query(By.css('button'));
    expect(labelButton.nativeElement.innerText).toBe('');

    labelButton.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    // Put the mouse onto the dropdown to prevent closing on click
    const dropdown = fixture.debugElement.query(By.directive(DropdownComponent)).nativeElement;
    dropdown.dispatchEvent(new MouseEvent('mouseenter'));

    expect(labelButton.nativeElement.classList.contains('open')).toBeTruthy();

    const dropdownContent = fixture.debugElement.query(By.css('.dropdown-content'));
    expect(dropdownContent).toBeTruthy();

    const checkBoxes = dropdownContent.queryAll(By.css('rb-form-multi-checkbox'));
    expect(checkBoxes.length).toEqual(5); // 1x select all + 4x options
    const checkBoxModels = checkBoxes.map(checkBox => checkBox.injector.get(NgModel));
    checkBoxModels.forEach(checkbox => {
      expect(checkbox.value).toBeFalsy();
    });

    let selectedValue: StateValues;

    testHost.updateValue = v => {
      selectedValue = v;
    };

    testHost.value = selectedStates;

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenStable();

    checkBoxModels.forEach((checkbox, i) => {
      if (i === 1) { // 2nd checkbox, because the first is the select all checkbox
        expect(checkbox.value).toBeTruthy();
      } else {
        expect(checkbox.value).toBeFalsy();
      }
    });

    checkBoxes[0].query(By.css('label')).nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(selectedValue).toEqual({a: true, b: true, c: true, d: true});

    checkBoxes[0].query(By.css('label')).nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(selectedValue).toEqual({a: false, b: false, c: false, d: false});


  });
});
