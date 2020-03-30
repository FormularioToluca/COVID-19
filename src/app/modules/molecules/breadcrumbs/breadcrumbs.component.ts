import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Breadcrumb, BreadcrumbsService } from './breadcrumbs.service';

@Component({
  selector: 'rb-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  breadcrumbs: Breadcrumb[] = [];

  /**
   * Minimal amount of entries the breadcrumb must have to be displayed
   */
  @Input() minElements = 0;

  private sub = null;

  constructor(private breadcrumbsService: BreadcrumbsService) {
  }

  ngOnInit() {
    this.sub = this.breadcrumbsService.breadcrumbs.subscribe(list => {
      this.breadcrumbs = list;
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
