import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCustomSelectComponent } from './form-custom-select.component';
import { IconModule } from '../../icon/icon.module';
import { FormErrorsComponent } from '../form-errors/form-errors.component';
import { DropdownModule } from '../../dropdown/dropdown.module';

describe('FormCustomSelectComponent', () => {
  let component: FormCustomSelectComponent;
  let fixture: ComponentFixture<FormCustomSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IconModule, DropdownModule],
      declarations: [FormCustomSelectComponent, FormErrorsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCustomSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
