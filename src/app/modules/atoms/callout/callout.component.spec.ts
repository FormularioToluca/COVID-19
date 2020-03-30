import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalloutComponent } from './callout.component';
import { IconModule } from '../icon/icon.module';

describe('CalloutComponent', () => {
  let component: CalloutComponent;
  let fixture: ComponentFixture<CalloutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IconModule],
      declarations: [ CalloutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalloutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
