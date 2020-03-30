import {
  ComponentFactoryResolver, ComponentRef, Directive, ElementRef, HostListener, Input, OnDestroy, TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { PopoverComponent } from './popover.component';

@Directive({
  selector: '[rbPopover]',
  exportAs: 'rbPopover'
})
export class PopoverDirective implements OnDestroy {

  @Input() position: 'bottom' | 'top' | 'left' | 'right' = 'bottom';
  @Input() anchor: ElementRef | HTMLElement;

  content: TemplateRef<any> | string;

  componentRef: ComponentRef<PopoverComponent> = null;

  closeSub = null;

  constructor(private factoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) {
  }


  ngOnDestroy() {
    this.closePopOver();
  }

  @Input('rbPopover') set template(tpl: TemplateRef<any> | string) {
    this.content = tpl;
  }

  @HostListener('click', ['$event'])
  onClick(e: MouseEvent) {
    e.preventDefault();
    this.openPopOver();
  }

  openPopOver() {
    if (this.componentRef) {
      this.closePopOver();
      return;
    }
    const componentFactory = this.factoryResolver.resolveComponentFactory(PopoverComponent);

    this.componentRef = this.viewContainerRef.createComponent(componentFactory);
    this.componentRef.instance.anchor = this.anchor || this.viewContainerRef.element;
    this.componentRef.instance.content = this.content;
    this.componentRef.instance.primaryPos = this.position;
    this.closeSub = this.componentRef.instance.close.subscribe(() => {
      this.closePopOver();
    });
    this.viewContainerRef.element.nativeElement.classList.add('open');

  }

  closePopOver() {
    if (this.componentRef) {
      if (this.closeSub) {
        this.closeSub.unsubscribe();
      }
      this.viewContainerRef.element.nativeElement.classList.remove('open');
      const viewIndex = this.viewContainerRef.indexOf(this.componentRef.hostView);
      if (viewIndex !== -1) {
        this.viewContainerRef.remove(viewIndex);
      }
      this.componentRef = null;
    }
  }

}
