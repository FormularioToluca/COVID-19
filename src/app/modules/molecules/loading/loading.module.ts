import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingDirective } from './loading.directive';
import { LoadingStatusComponent } from './loading-status/loading-status.component';
import { LoadingSpinnerModule } from '../../atoms/loading-spinner/loading-spinner.module';
import { CalloutModule } from '../../atoms/callout/callout.module';
import { ErrorFormatPipe } from './error-format.pipe';
import { LoadingLinkDirective } from './loading-link.directive';
import { ErrorFormatComponent } from './error-format/error-format.component';

@NgModule({
  imports: [
    CommonModule,
    LoadingSpinnerModule,
    CalloutModule
  ],
  declarations: [
    LoadingDirective,
    LoadingStatusComponent,
    ErrorFormatPipe,
    LoadingLinkDirective,
    ErrorFormatComponent
  ],
  exports: [
    LoadingDirective,
    LoadingStatusComponent,
    ErrorFormatPipe,
    LoadingLinkDirective,
    ErrorFormatComponent
  ],
  entryComponents: [LoadingStatusComponent]
})
export class LoadingModule {
}
