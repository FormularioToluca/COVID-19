import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRadioComponent } from './form-radio.component';
import { FormErrorsComponent } from '../form-errors/form-errors.component';

describe('FormRadioComponent', () => {
  let component: FormRadioComponent;
  let fixture: ComponentFixture<FormRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRadioComponent, FormErrorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
