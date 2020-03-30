import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { IconModule } from '../../icon/icon.module';
import { ModalService } from '../modal.service';
import { ModalComponent } from '../modal.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async(() => {
    const testBed = TestBed.configureTestingModule({
      imports: [IconModule],
      declarations: [AlertComponent, ModalComponent],
      providers: [ModalService]
    });
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ModalComponent]
      }
    });
    testBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
