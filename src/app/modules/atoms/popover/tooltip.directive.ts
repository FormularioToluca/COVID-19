import {
  ComponentFactoryResolver, ComponentRef, Directive, ElementRef, HostListener, Input, OnDestroy, TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { PopoverComponent } from './popover.component';

@Directive({
  selector: '[rbTooltip]',
  exportAs: 'rbPopover'
})
export class TooltipDirective implements OnDestroy {

  @Input() position: 'bottom' | 'top' | 'left' | 'right' = 'top';

  /**
   * Disables that the tooltip stays open when clicked.
   * Instead the tooltip is closed.
   */
  @Input() noFix = false;

  @Input() context: Record<string, any>;

  @Input() anchor: ElementRef | HTMLElement;

  content: TemplateRef<any> | string;

  componentRef: ComponentRef<PopoverComponent> = null;

  private closeSub = null;

  private fixed = false;

  constructor(private factoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) {
  }


  ngOnDestroy() {
    this.closeTooltip();
  }

  @Input('rbTooltip') set template(tpl: TemplateRef<any> | string) {
    this.content = tpl;
  }

  @HostListener('click', ['$event'])
  onClick(e: MouseEvent) {
    if (this.noFix === false) {
      e.preventDefault();
      e.stopPropagation();
      this.fixed = true;
      this.openTooltip();
    }
  }

  @HostListener('mouseenter', ['$event'])
  onEnter(e: MouseEvent) {
    e.preventDefault();
    this.openTooltip();
  }

  @HostListener('mouseleave', ['$event'])
  onLeave(e: MouseEvent) {
    if (!this.fixed) {
      e.preventDefault();
      this.closeTooltip();
    }

  }

  openTooltip() {
    if (this.componentRef) {
      this.updateComponentState();
      return;
    }
    const componentFactory = this.factoryResolver.resolveComponentFactory(PopoverComponent);

    this.componentRef = this.viewContainerRef.createComponent(componentFactory);
    const instance = this.componentRef.instance;
    instance.anchor = this.anchor || this.viewContainerRef.element;
    instance.content = this.content;
    instance.primaryPos = this.position;
    if (this.context) {
      Object.assign(instance.context, this.context);
    }
    instance.context.fixed = this.fixed;
    this.updateComponentState();
    this.closeSub = instance.close.subscribe(() => {
      this.closeTooltip();
    });
    this.viewContainerRef.element.nativeElement.classList.add('open');

  }

  updateComponentState() {
    const instance = this.componentRef.instance;
    instance.context.fixed = this.fixed;
    if (this.fixed) {
      this.viewContainerRef.element.nativeElement.classList.add('open-fixed');
      instance.popoverElementRef.nativeElement.classList.add('open-fixed');
    }
  }

  closeTooltip() {
    this.fixed = false;
    if (this.componentRef) {
      if (this.closeSub) {
        this.closeSub.unsubscribe();
      }
      this.viewContainerRef.element.nativeElement.classList.remove('open');
      this.viewContainerRef.element.nativeElement.classList.remove('open-fixed');
      const viewIndex = this.viewContainerRef.indexOf(this.componentRef.hostView);
      if (viewIndex !== -1) {
        this.viewContainerRef.remove(viewIndex);
      }
      this.componentRef = null;
    }
  }

}
