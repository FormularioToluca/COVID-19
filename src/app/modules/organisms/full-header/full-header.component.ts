import { Component, ContentChild, ElementRef, HostListener, OnInit, Optional, ViewChild } from '@angular/core';
import {
  ActionNavItemsDirective,
  MainNavItemsDirective,
  MetaNavItemsDirective,
  SubNavItemsDirective
} from './navigation/navigation.directive';
import { LogoHeaderDirective, SubBrandHeaderDirective } from './full-header.directive';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'rb-full-header',
  templateUrl: './full-header.component.html'
})
export class FullHeaderComponent implements OnInit {

  open = false;
  opened = false;

  @ViewChild('header', {static: true}) headerElement: ElementRef;
  @ViewChild('placeholder', {static: true}) headerPlaceholderElement: ElementRef;

  @ContentChild(MainNavItemsDirective, {static: false}) mainNavItems: MainNavItemsDirective;
  @ContentChild(SubNavItemsDirective, {static: false}) subNavItems: SubNavItemsDirective;
  @ContentChild(MetaNavItemsDirective, {static: false}) metaNavItems: MetaNavItemsDirective;
  @ContentChild(ActionNavItemsDirective, {static: false}) actionNavItems: ActionNavItemsDirective;
  @ContentChild(SubBrandHeaderDirective, {static: false}) subBrand: SubBrandHeaderDirective;
  @ContentChild(LogoHeaderDirective, {static: false}) customLogo: LogoHeaderDirective;

  fullHeight = null;

  constructor(@Optional() private router: Router) {
  }

  ngOnInit() {
    if (this.router) {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(event => {
        this.open = false;
      });
    }
  }

  toggle() {
    this.open = !this.open;
    if (this.open) {
      this.opened = true;
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    const header = this.headerElement.nativeElement;
    const placeholder = this.headerPlaceholderElement.nativeElement;
    const height = header.offsetHeight;
    const isSticky = header.classList.contains('sticky');
    if (!isSticky) {
      this.fullHeight = height;
    }
    if (window.pageYOffset > this.fullHeight && !isSticky) {
      header.classList.add('sticky');
      placeholder.classList.add('sticky');
      placeholder.style.height = this.fullHeight + 'px';
    } else if (window.pageYOffset <= this.fullHeight && isSticky) {
      header.classList.remove('sticky');
      placeholder.classList.remove('sticky');
    }
  }

}
