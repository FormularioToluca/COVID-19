import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSelectComponent } from './form-select.component';
import { FormsModule } from '@angular/forms';
import { IconModule } from '../../icon/icon.module';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormErrorsComponent } from '../form-errors/form-errors.component';

@Component({
  template: `
    <rb-form-select [ngModel]="value" (ngModelChange)="updateOption($event)">
      <option *ngFor="let opt of options" [value]="opt">{{opt}}</option>
    </rb-form-select>`
})
class TestHostComponent {
  value = null;
  options = [];

  updateOption(value) {
  }
}

describe('FormSelectComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let select: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, IconModule],
      declarations: [FormSelectComponent, TestHostComponent, FormErrorsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    select = fixture.debugElement.query(By.css('select'));
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should handle not selected option', async () => {
    fixture.detectChanges();
    component.options = ['a', 'b', 'c'];
    component.value = null;
    fixture.detectChanges();
    await fixture.whenStable();
    expect(select.nativeElement.value).toEqual('');

  });

  it('should handle selected option', async () => {
    fixture.detectChanges();
    component.options = ['a', 'b', 'c'];
    component.value = 'b';
    fixture.detectChanges();
    await fixture.whenStable();
    expect(select.nativeElement.value).toEqual('b');

  });

  it('should handle initially selected option', async () => {
    component.options = ['a', 'b', 'c'];
    component.value = 'b';
    fixture.detectChanges();
    await fixture.whenStable();
    expect(select.nativeElement.value).toEqual('b');

    component.value = 'a';
    fixture.detectChanges();
    await fixture.whenStable();
    expect(select.nativeElement.value).toEqual('a');

  });

  it('should notice changes', async () => {
    fixture.detectChanges();
    component.options = ['a', 'b', 'c'];
    fixture.detectChanges();
    await fixture.whenStable();
    expect(select.nativeElement.value).toEqual('');


    let newValue = null;
    component.updateOption = (v) => {
      newValue = v;
    };

    select.nativeElement.value = 'c';
    select.nativeElement.dispatchEvent(new Event('change'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(newValue).toEqual('c');

  });
});
