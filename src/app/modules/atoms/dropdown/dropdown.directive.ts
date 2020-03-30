import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { DropdownComponent } from './dropdown.component';

@Directive({
  selector: '[rbDropdown]',
  exportAs: 'rbDropdown'
})
export class DropdownDirective implements OnDestroy, OnInit {

  @Input() position: 'left' | 'right' | 'center' = 'left';

  @Input() autoClose = true;

  @Input() renderOnInit = false;

  @Input() hugContent = false;

  private _context: Record<string, any>;

  openOnClick = true;

  tpl: TemplateRef<any>;

  componentRef: ComponentRef<DropdownComponent> = null;

  closeSub = null;

  constructor(private factoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) {
  }


  ngOnDestroy() {
    this.closeDropdown();
  }


  ngOnInit(): void {
    if (this.renderOnInit) {
      this.renderDropdown();
    }
  }

  @Input('rbDropdown') set template(tpl: TemplateRef<any>) {
    this.tpl = tpl;
  }

  @HostListener('click', ['$event'])
  onClick(e: MouseEvent) {
    if (!this.openOnClick) {
      return;
    }
    e.preventDefault();
    this.openDropdown();
  }

  @Input() set context(ctx: Record<string, any>) {
    this._context = ctx;
    if (this.componentRef) {
      this.componentRef.instance.updateContext(ctx);
    }
  }

  renderDropdown() {
    const componentFactory = this.factoryResolver.resolveComponentFactory(DropdownComponent);
    this.componentRef = this.viewContainerRef.createComponent(componentFactory);
    this.componentRef.instance.anchor = this.viewContainerRef.element;
    this.componentRef.instance.content = this.tpl;
    this.componentRef.instance.primaryPos = this.position;
    this.componentRef.instance.autoClose = this.autoClose;
    this.componentRef.instance.hugContent = this.hugContent;
    this.closeSub = this.componentRef.instance.close.subscribe(() => {
      this.closeDropdown();
    });
    if (this._context) {
      this.componentRef.instance.updateContext(this._context);
    }
  }

  openDropdown() {
    if (this.componentRef && !this.renderOnInit || this.renderOnInit && this.componentRef.instance.shown) {
      this.closeDropdown();
      return;
    }

    if (!this.renderOnInit) {
      this.renderDropdown();
    }

    this.componentRef.instance.show();
    this.viewContainerRef.element.nativeElement.classList.add('open');

  }

  closeDropdown() {
    if (this.componentRef) {

      this.componentRef.instance.hide();
      this.viewContainerRef.element.nativeElement.classList.remove('open');

      if (!this.renderOnInit) {
        if (this.closeSub) {
          this.closeSub.unsubscribe();
        }
        const viewIndex = this.viewContainerRef.indexOf(this.componentRef.hostView);
        if (viewIndex !== -1) {
          this.viewContainerRef.remove(viewIndex);
        }
        this.componentRef = null;
      }
    }
  }

}
