import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ModalDirective } from './modal.directive';
import { ModalService } from './modal.service';
import { IconModule } from '../icon/icon.module';
import { DialogComponent } from './dialog/dialog.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  imports: [
    CommonModule,
    IconModule
  ],
  declarations: [
    ModalComponent,
    ModalDirective,
    DialogComponent,
    AlertComponent
  ],
  exports: [
    ModalComponent,
    ModalDirective,
    DialogComponent,
    AlertComponent
  ],
  entryComponents: [
    ModalComponent
  ]
})
export class ModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ModalModule,
      providers: [
        ModalService
      ]
    };
  }
}
