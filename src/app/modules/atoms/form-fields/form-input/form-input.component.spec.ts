import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputComponent } from './form-input.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { FormErrorsComponent } from '../form-errors/form-errors.component';

@Component({
  template: `
    <rb-form-input name="test" [(ngModel)]="value"></rb-form-input>`
})
class TestHostComponent {
  value = null;
}

describe('FormInputComponent', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let input: DebugElement;
  let componentElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [FormInputComponent, TestHostComponent, FormErrorsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    input = fixture.debugElement.query(By.css('input'));
    componentElement = fixture.debugElement.query(By.css('rb-form-input'));
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(hostComponent).toBeTruthy();
    expect(input.nativeElement).toBeTruthy();
    expect(input.nativeElement.value).toEqual('');
  });

  it('should have initial value', async () => {
    hostComponent.value = 'initial';
    fixture.detectChanges();
    await fixture.whenStable();
    expect(componentElement.nativeElement.classList.contains('not-empty')).toBeTruthy();
    expect(input.nativeElement.value).toEqual('initial');
  });

  it('should handle null value', async () => {
    hostComponent.value = null;
    fixture.detectChanges();
    await fixture.whenStable();
    expect(input.nativeElement.value).toEqual('');
    expect(componentElement.nativeElement.classList.contains('not-empty')).toBeFalsy();

    hostComponent.value = 'something';
    fixture.detectChanges();
    await fixture.whenStable();
    expect(input.nativeElement.value).toEqual('something');
    expect(componentElement.nativeElement.classList.contains('not-empty')).toBeTruthy();

  });

});
