import { ApplicationRef, ComponentFactoryResolver, Directive, HostListener, Injector, Input, Optional, TemplateRef } from '@angular/core';
import { ModalService } from './modal.service';

@Directive({
  selector: '[rbModal]'
})
export class ModalDirective {

  content: string | TemplateRef<any>;
  @Input() showClose = true;
  @Input() position: 'middle' | 'top' | 'bottom' = 'middle';
  @Input() maxWidth: string;
  @Input() backdropClose = true;
  @Input() stacked = false;

  constructor(@Optional() private modalService: ModalService,
              factoryResolver: ComponentFactoryResolver,
              injector: Injector,
              appRef: ApplicationRef) {
    if (!this.modalService) {
      this.modalService = new ModalService(factoryResolver, injector, appRef);
    }
  }

  @HostListener('click', ['$event']) click(event: MouseEvent) {
    event.preventDefault();

    this.modalService.open(this.content, {
      showClose: this.showClose,
      position: this.position,
      maxWidth: this.maxWidth,
      backdropClose: this.backdropClose,
      stacked: this.stacked
    });

  }

  @Input() set rbModal(content: string | TemplateRef<any>) {
    this.content = content;
  }

}
