import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
  TemplateRef,
  Type
} from '@angular/core';
import { ModalComponent, ModalOptions } from './modal.component';

export interface OpenModal {
  componentRef: ComponentRef<ModalComponent>;
  onClose: (reason?: any) => void;
}

export interface ComponentModal<T> {
  instance: T;
  result: Promise<any>;
}

@Injectable()
export class ModalService {

  backdrop: Element;
  container: Element;

  private componentFactory: ComponentFactory<ModalComponent>;

  private openComponents: OpenModal[] = [];

  private keyListener;
  private focusListener;

  constructor(private factoryResolver: ComponentFactoryResolver,
              private injector: Injector,
              private appRef: ApplicationRef) {
    const el = document.querySelector('.rb-modal-backdrop');
    if (el) {
      this.backdrop = el;
    } else {
      this.backdrop = document.body.appendChild(document.createElement('div'));
      this.backdrop.className = 'rb-modal-backdrop';
      let isDown = false;
      this.backdrop.addEventListener('mousedown', e => {
        if (e.target === this.backdrop) {
          isDown = true;
        }
      });
      this.backdrop.addEventListener('mouseup', e => {
        if (isDown && e.target === this.backdrop) {
          this.nonButtonClose();
        }
        isDown = false;
      });
    }
    this.componentFactory = this.factoryResolver.resolveComponentFactory(ModalComponent);
  }

  private get appRoot(): Element {
    return this.appRef.components[0].location.nativeElement;
  }

  /**
   * Opens a component in a modal. Creates the component instance.
   * Provide an injector in case the ModalService is not instantiated with the Injector that knows the Component.
   */
  openComponent<T>(component: Type<T>, options?: ModalOptions, injector?: Injector): ComponentModal<T> {
    const factoryResolver = (injector || this.injector).get(ComponentFactoryResolver);
    const factory = factoryResolver.resolveComponentFactory(component);
    const componentRef = factory.create(injector || this.injector);
    const result = this.open(componentRef, options);
    return {
      result: result,
      instance: componentRef.instance
    };
  }

  open(content: string | TemplateRef<any> | Type<any> | ComponentRef<any>, options?: ModalOptions): Promise<any> {
    return new Promise<any>(resolve => {
      if (this.openComponents.length && options && options.stacked) {
        this.lastOpenModalElement().classList.add('hidden');
      } else {
        this.close();
      }

      if (!this.openComponents.length) {
        document.body.classList.add('rb-modal-open');
        if (this.appRef.components.length) {
          this.appRoot.classList.add('rb-modal-frost');
        }
        this.ensureListeners();
      }

      this.backdrop.classList.remove('large-fix');

      const componentRef = this.componentFactory.create(this.injector);
      if (content instanceof TemplateRef) {
        componentRef.instance.contentTpl = content;
      } else if (typeof (content) === 'string') {
        componentRef.instance.contentText = content;
      } else if (content instanceof ComponentRef) {
        componentRef.instance.contentComponentRef = content;
      } else if (typeof (content) === 'function') {
        componentRef.instance.contentComponent = content;
      }
      componentRef.instance.close = this.close.bind(this);
      if (options) {
        Object.assign(componentRef.instance.options, options);
      }

      this.appRef.attachView(componentRef.hostView);

      this.backdrop.appendChild(componentRef.location.nativeElement);

      componentRef.location.nativeElement.focus();

      // Fix for IE
      setTimeout(() => {
        if (componentRef.location.nativeElement.offsetTop < 0) {
          this.backdrop.classList.add('large-fix');
        }
      }, 10);


      this.openComponents.push({
        componentRef: componentRef,
        onClose: resolve
      });
    });
  }

  close(reason?: any) {
    const openModal = this.openComponents.pop();
    if (!openModal) {
      return;
    }

    this.appRef.detachView(openModal.componentRef.hostView);
    openModal.componentRef.destroy();
    if (!this.openComponents.length) {
      document.body.classList.remove('rb-modal-open');
      if (this.appRef.components.length) {
        this.appRoot.classList.remove('rb-modal-frost');
      }
      this.removeListeners();
    } else {
      this.lastOpenModalElement().classList.remove('hidden');
    }

    if (openModal.onClose) {
      openModal.onClose(reason);
    }
  }

  private nonButtonClose() {
    const instance = this.lastOpenModalInstance();
    if (instance && instance.options.backdropClose || !instance) {
      this.close();
    }
  }

  private ensureListeners() {
    if (!this.keyListener) {
      this.keyListener = e => {
        // ESC pressed
        if (e.key === 'Escape') {
          this.nonButtonClose();
        }
      };
    }
    document.addEventListener('keyup', this.keyListener, true);

    if (!this.focusListener) {
      this.focusListener = e => {
        // Focus changes
        if (this.appRoot.contains(document.activeElement)) {
          const firstFocusable = this.backdrop.querySelector('a,button');
          (firstFocusable as HTMLElement).focus();
        }
      };
    }
    document.addEventListener('focus', this.focusListener, true);
  }

  private removeListeners() {
    if (this.keyListener) {
      document.removeEventListener('keyup', this.keyListener, true);
    }
    if (this.focusListener) {
      document.removeEventListener('focus', this.focusListener, true);
    }

  }

  private lastOpenModal(): OpenModal {
    return this.openComponents[this.openComponents.length - 1];
  }

  private lastOpenModalElement(): Element {
    const modal = this.lastOpenModal();
    if (modal) {
      return modal.componentRef.location.nativeElement;
    }
  }

  private lastOpenModalInstance(): ModalComponent {
    const modal = this.lastOpenModal();
    if (modal) {
      return modal.componentRef.instance;
    }
  }


}
