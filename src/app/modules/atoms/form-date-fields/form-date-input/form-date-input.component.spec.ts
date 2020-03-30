import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDateInputComponent } from './form-date-input.component';
import { IconModule } from '../../icon/icon.module';
import { FormsModule } from '@angular/forms';
import { FormErrorsComponent } from '../../form-fields/form-errors/form-errors.component';

describe('FormDateInputComponent', () => {
  let component: FormDateInputComponent;
  let fixture: ComponentFixture<FormDateInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, IconModule],
      declarations: [ FormDateInputComponent, FormErrorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
