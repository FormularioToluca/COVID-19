import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormMultiCheckboxComponent } from './form-multi-checkbox.component';
import { IconModule } from '../../icon/icon.module';
import { By } from '@angular/platform-browser';
import { FormErrorsComponent } from '../form-errors/form-errors.component';

describe('FormMultiCheckboxComponent', () => {
  let component: FormMultiCheckboxComponent;
  let fixture: ComponentFixture<FormMultiCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IconModule],
      declarations: [FormMultiCheckboxComponent, FormErrorsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMultiCheckboxComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should be unchecked and checked after click', () => {
    const inputElement = fixture.debugElement.query(By.css('input'));
    const labelElement = fixture.debugElement.query(By.css('label'));

    fixture.detectChanges();

    expect(inputElement.nativeElement.checked).toBeFalsy();
    expect(component.state).toBeFalsy();

    labelElement.nativeElement.click();
    fixture.detectChanges();

    expect(inputElement.nativeElement.checked).toBeTruthy();
    expect(component.state).toBeTruthy();

  });

  it('should cycle through three states', () => {
    const labelElement = fixture.debugElement.query(By.css('label'));

    component.numStates = 3;

    fixture.detectChanges();

    expect(component.state).toBe(null);

    labelElement.nativeElement.click();
    fixture.detectChanges();

    expect(component.state).toBe(true);

    labelElement.nativeElement.click();
    fixture.detectChanges();

    expect(component.state).toBe(false);

    labelElement.nativeElement.click();
    fixture.detectChanges();

    expect(component.state).toBe(null);
  });
});
