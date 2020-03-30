import { ActivatedRoute, ChildrenOutletContexts, Data, RouterOutlet } from '@angular/router';
import { Attribute, ComponentFactoryResolver, ComponentRef, Directive, OnDestroy, OnInit } from '@angular/core';

/**
 * Mocks the Router Outlet
 */
@Directive({
  // tslint:disable-next-line
  selector: 'rb-tab-panel-outlet'
})
export class TabPanelRouterOutletDirective extends RouterOutlet implements OnDestroy, OnInit {
  private __activated: boolean;
  private __activatedRoute: ActivatedRoute | null = null;
  private _name: string;

  constructor(private _parentContexts: ChildrenOutletContexts, @Attribute('name') name: string) {
    super(_parentContexts, null, null, name, null);
    this._name = name;
  }

  ngOnInit(): void {
    if (!this.__activated) {
      // If the outlet was not instantiated at the time the route got activated we need to populate
      // the outlet when it is initialized (ie inside a NgIf)
      const context = this._parentContexts.getContext(this._name);
      if (context && context.route) {
        if (context.attachRef) {
          // `attachRef` is populated when there is an existing component to mount
          this.attach(context.attachRef, context.route);
        } else {
          // otherwise the component defined in the configuration is created
          this.activateWith(context.route, context.resolver || null);
        }
      }
    }
  }

  get isActivated(): boolean {
    return this.__activated;
  }

  get component(): Object {
    if (!this.__activated) {
      throw new Error('Outlet is not activated');
    }
    return null;
  }

  get activatedRoute(): ActivatedRoute {
    if (!this.__activated) {
      throw new Error('Outlet is not activated');
    }
    return this.__activatedRoute as ActivatedRoute;
  }

  get activatedRouteData(): Data {
    if (this.__activatedRoute) {
      return this.__activatedRoute.snapshot.data;
    }
    return {};
  }

  /**
   * Called when the `RouteReuseStrategy` instructs to detach the subtree
   */
  detach(): ComponentRef<any> {
    if (!this.__activated) {
      throw new Error('Outlet is not activated');
    }
    this.__activated = null;
    this.__activatedRoute = null;
    return null;
  }

  /**
   * Called when the `RouteReuseStrategy` instructs to re-attach a previously detached subtree
   */
  attach(ref: ComponentRef<any>, activatedRoute: ActivatedRoute) {
    this.__activated = true;
    this.__activatedRoute = activatedRoute;
    this.onActivate(activatedRoute);
  }

  deactivate(): void {
    if (this.__activated) {
      this.__activated = false;
      this.__activatedRoute = null;
    }
  }

  activateWith(activatedRoute: ActivatedRoute, resolver: ComponentFactoryResolver | null) {
    console.log('activateWith', activatedRoute);
    if (this.isActivated) {
      throw new Error('Cannot activate an already activated outlet');
    }
    this.__activatedRoute = activatedRoute;
    this.__activated = true;
    this.onActivate(activatedRoute);
  }

  onActivate(activatedRoute: ActivatedRoute) {
  }
}
