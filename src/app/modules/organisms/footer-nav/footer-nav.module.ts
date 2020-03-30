import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterNavComponent } from './footer-nav.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FooterNavComponent],
  exports: [FooterNavComponent]
})
export class FooterNavModule {
}
