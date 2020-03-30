import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { BreadcrumbsService } from './breadcrumbs.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [BreadcrumbsComponent],
  exports: [BreadcrumbsComponent]
})
export class BreadcrumbsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BreadcrumbsModule,
      providers: [
        BreadcrumbsService
      ]
    };
  }
}
