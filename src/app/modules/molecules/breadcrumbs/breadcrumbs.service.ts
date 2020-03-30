import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

export interface Breadcrumb {
  title: string;
  urlSegments: Array<string>;
}

/**
 * When you define routes, add data: {title: 'myTitle'} to define what is displayed in the breadcrumbs.
 * If the title property is not enough for you to determine what should be displayed, you can
 * just extend this service and provide your own. This is probably necessary when you use some i18n tooling.
 *
 * You need to provide this service to use the rb-breadcrumbs component.
 * e.g. BreadcrumbsModule.forRoot()
 */
@Injectable()
export class BreadcrumbsService {

  public breadcrumbs: BehaviorSubject<Breadcrumb[]>;

  constructor(protected router: Router,
              protected activeRoute: ActivatedRoute) {
    this.initAutomatedRouteRecognition();
  }

  protected initAutomatedRouteRecognition() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.refresh());
    this.breadcrumbs = new BehaviorSubject<Breadcrumb[]>(this.identifyRoute());
  }

  refresh() {
    this.breadcrumbs.next(this.identifyRoute());
  }

  identifyRoute() {
    const breadcrumbs = [];
    const path = ['/'];
    // Traverse route snapshots to get the breadcrumbs path
    for (let route = this.activeRoute.snapshot; route; route = route.firstChild) {
      if (route.outlet === 'primary') {
        path.push(...route.url.map(segment => segment.path));
      }
      const element = this.getBreadCrumbElement(route, path);
      if (element) {
        breadcrumbs.push(element);
      }
    }
    return breadcrumbs;
  }

  protected getBreadCrumbElement(route: ActivatedRouteSnapshot, path: string[]): Breadcrumb {
    const element = {
      urlSegments: path.slice(0),
      title: '...'
    };
    if (route.outlet === 'primary' && route.data && route.data['title']) {
      element.title = typeof(route.data['title']) === 'function' ? route.data['title'](route) : route.data['title'];
      return element;
    }
    return null;
  }

}
