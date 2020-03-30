import { ModalDirective } from './modal.directive';
import { async, TestBed } from '@angular/core/testing';
import { IconModule } from '../icon/icon.module';
import { ModalComponent } from './modal.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ModalService } from './modal.service';

describe('ModalDirective', () => {
  let directive: ModalDirective;

  beforeEach(async(() => {
    const testBed = TestBed.configureTestingModule({
      imports: [IconModule],
      declarations: [ModalComponent, ModalDirective],
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
    directive = new ModalDirective(TestBed.get(ModalService), null, null, null);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
