import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';
import { ModalService } from '../modal.service';
import { ModalComponent } from '../modal.component';
import { IconModule } from '../../icon/icon.module';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async(() => {
    const testBed = TestBed.configureTestingModule({
      imports: [IconModule],
      declarations: [DialogComponent, ModalComponent],
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
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
