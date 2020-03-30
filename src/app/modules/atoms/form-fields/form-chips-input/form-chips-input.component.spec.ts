import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { FormChipsInputComponent } from './form-chips-input.component';
import { FormErrorsComponent } from '../form-errors/form-errors.component';
import { FormsModule } from '@angular/forms';
import { IconModule } from '../../icon/icon.module';

describe('FormChipsInputComponent', () => {
  let component: FormChipsInputComponent;
  let fixture: ComponentFixture<FormChipsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, IconModule],
      declarations: [FormChipsInputComponent, FormErrorsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormChipsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly emit chip added event', fakeAsync(() => {
    component.chipAdded.subscribe((chip: string) => {
      expect(chip).toEqual('foo');
    });
    component.addChip('foo');
  }));

  it('should correctly emit chip deleted event when removing last chip', fakeAsync(() => {
    component.addChip('foo');
    component.addChip('bar');
    component.addChip('baz');

    component.chipDeleted.subscribe((chip: string) => {
      expect(chip).toEqual('baz');
    });

    component.removeLast();
  }));

  it('should correctly emit chip deleted event when removing chip by index', fakeAsync(() => {
    component.addChip('foo');
    component.addChip('bar');
    component.addChip('baz');

    component.chipDeleted.subscribe((chip: string) => {
      expect(chip).toEqual('bar');
    });

    component.removeAtIndex(1);
  }));

  it('should correctly emit chip deleted event when removing chip by name', fakeAsync(() => {
    component.addChip('foo');
    component.addChip('bar');
    component.addChip('baz');

    component.chipDeleted.subscribe((chip: string) => {
      expect(chip).toEqual('foo');
    });

    component.removeChip('foo');
  }));
});
