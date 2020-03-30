import {
  ComponentFactory,
  ComponentFactoryResolver, ComponentRef, Directive, DoCheck, EmbeddedViewRef, Input, TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { LoadingEntity } from './loading-utils';
import { LoadingStatusComponent } from './loading-status/loading-status.component';

@Directive({
  selector: '[rbLoading]'
})
export class LoadingDirective implements DoCheck {

  private loadingRef: ComponentRef<LoadingStatusComponent> = null;
  private viewRef: EmbeddedViewRef<LoadingStatusComponent> = null;
  private loadingEntity: LoadingEntity<any>;
  private factory: ComponentFactory<LoadingStatusComponent>;

  @Input() rbLoadingSize = 1;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private componentFactory: ComponentFactoryResolver) { }
  ngDoCheck() {
    if (this.loadingEntity) {
      this.updateView(this.loadingEntity.loading || this.loadingEntity.error);
    }
  }

  @Input()
  set rbLoading(state: boolean | LoadingEntity<any>) {
    this.factory = this.componentFactory.resolveComponentFactory(LoadingStatusComponent);
    this.updateState(state);
  }

  updateState(state: boolean | LoadingEntity<any>) {
    if (state instanceof LoadingEntity) {
      this.loadingEntity = state;
      state = !!(this.loadingEntity.loading || this.loadingEntity.error);
    }
    this.updateView(state);
  }

  updateView(state: boolean) {
    if (state) {
      if (!this.loadingRef) {
        this.viewContainer.clear();
        this.viewRef = null;
        this.loadingRef = this.viewContainer.createComponent(this.factory);
        this.loadingRef.instance.loadingEntity = this.loadingEntity;
        this.loadingRef.instance.size = this.rbLoadingSize;
      }

    } else {
      if (!this.viewRef) {
        this.viewContainer.clear();
        this.loadingRef = null;
        this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef);
      }

    }
  }
}
