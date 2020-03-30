import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingStatusComponent } from './loading-status.component';
import { LoadingSpinnerModule } from '../../../atoms/loading-spinner/loading-spinner.module';
import { CalloutModule } from '../../../atoms/callout/callout.module';
import { ErrorFormatPipe } from '../error-format.pipe';
import { ErrorFormatComponent } from '../error-format/error-format.component';

describe('LoadingStatusComponent', () => {
  let component: LoadingStatusComponent;
  let fixture: ComponentFixture<LoadingStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        LoadingSpinnerModule,
        CalloutModule
      ],
      declarations: [LoadingStatusComponent, ErrorFormatPipe, ErrorFormatComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
