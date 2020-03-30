import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFileComponent } from './form-file.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormErrorsComponent } from '../form-errors/form-errors.component';

@Component({
  template: `
    <rb-form-file (filesChange)="updateFiles($event)" required></rb-form-file>`
})
class TestHostComponent {
  updateFiles(files: File[]) {
  }
}

describe('FormFileComponent', () => {
  let component: FormFileComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormFileComponent, TestHostComponent, FormErrorsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    component = fixture.debugElement.query(By.directive(FormFileComponent)).componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
