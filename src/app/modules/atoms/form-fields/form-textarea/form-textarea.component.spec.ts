import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTextareaComponent } from './form-textarea.component';
import { FormsModule } from '@angular/forms';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormErrorsComponent } from '../form-errors/form-errors.component';

@Component({
  template: `
    <rb-form-textarea [ngModel]="value"></rb-form-textarea>`
})
class TestHostComponent {
  value = null;
}

describe('FormTextareaComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let input: DebugElement;
  let testComponent: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ FormTextareaComponent, TestHostComponent, FormErrorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    input = fixture.debugElement.query(By.css('textarea'));
    testComponent = fixture.debugElement.query(By.directive(FormTextareaComponent));
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(input.nativeElement).toBeTruthy();
    expect(input.nativeElement.value).toEqual('');
  });

  it('should have initial value', async () => {
    component.value = 'initial';
    fixture.detectChanges();
    await fixture.whenStable();
    expect(testComponent.nativeElement.classList.contains('not-empty')).toBeTruthy();
    expect(input.nativeElement.value).toEqual('initial');
  });

  it('should handle null value', async () => {
    component.value = null;
    fixture.detectChanges();
    await fixture.whenStable();
    expect(input.nativeElement.value).toEqual('');
    expect(testComponent.nativeElement.classList.contains('not-empty')).toBeFalsy();

    component.value = 'something';
    fixture.detectChanges();
    await fixture.whenStable();
    expect(input.nativeElement.value).toEqual('something');
    expect(testComponent.nativeElement.classList.contains('not-empty')).toBeTruthy();

  });
});
