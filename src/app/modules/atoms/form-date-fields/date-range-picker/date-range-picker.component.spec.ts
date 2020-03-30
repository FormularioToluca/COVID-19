import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRangePickerComponent } from './date-range-picker.component';
import { FormsModule } from '@angular/forms';
import { TabPanelModule } from '../../../molecules/tab-panel/tab-panel.module';
import { RelativeTimeInputComponent } from '../form-relative-time-input/relative-time-input.component';
import { FormFieldsModule } from '../../form-fields/form-fields.module';

describe('DateRangePickerComponent', () => {
  let component: DateRangePickerComponent;
  let fixture: ComponentFixture<DateRangePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, TabPanelModule, FormFieldsModule],
      declarations: [DateRangePickerComponent, RelativeTimeInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
