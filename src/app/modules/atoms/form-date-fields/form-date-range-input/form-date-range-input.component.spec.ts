import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDateRangeInputComponent } from './form-date-range-input.component';
import { DateRangePickerComponent } from '../date-range-picker/date-range-picker.component';
import { DropdownModule } from '../../dropdown/dropdown.module';
import { FormFieldsModule } from '../../form-fields/form-fields.module';
import { FormsModule } from '@angular/forms';
import { TabPanelModule } from '../../../molecules/tab-panel/tab-panel.module';
import { RelativeTimeInputComponent } from '../form-relative-time-input/relative-time-input.component';

describe('FormDateRangeInputComponent', () => {
  let component: FormDateRangeInputComponent;
  let fixture: ComponentFixture<FormDateRangeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DropdownModule, FormFieldsModule, FormsModule, TabPanelModule],
      declarations: [FormDateRangeInputComponent, DateRangePickerComponent, RelativeTimeInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDateRangeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
