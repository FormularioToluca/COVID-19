import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorFormatComponent } from './error-format.component';

describe('ErrorFormatComponent', () => {
  let component: ErrorFormatComponent;
  let fixture: ComponentFixture<ErrorFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorFormatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
