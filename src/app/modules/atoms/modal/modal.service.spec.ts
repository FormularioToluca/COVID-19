import { TestBed, inject } from '@angular/core/testing';

import { ModalService } from './modal.service';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ModalComponent } from './modal.component';
import { IconModule } from '../icon/icon.module';

describe('ModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IconModule],
      declarations: [ModalComponent],
      providers: [ModalService]
    });
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ModalComponent]
      }
    });
  });

  it('should be created', inject([ModalService], (service: ModalService) => {
    expect(service).toBeTruthy();
  }));
});
