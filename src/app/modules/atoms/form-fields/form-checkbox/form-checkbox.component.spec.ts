import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCheckboxComponent } from './form-checkbox.component';
import { FormsModule } from '@angular/forms';
import { IconModule } from '../../icon/icon.module';
import { FormErrorsComponent } from '../form-errors/form-errors.component';

describe('FormCheckboxComponent', () => {
  let component: FormCheckboxComponent;
  let fixture: ComponentFixture<FormCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, IconModule],
      declarations: [FormCheckboxComponent, FormErrorsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
