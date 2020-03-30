import { Directive, TemplateRef } from '@angular/core';
import { NavItemsDirective } from '../../../molecules/navigation/navigation.component';

@Directive({
  selector: '[rbMainNavItems]'
})
export class MainNavItemsDirective implements NavItemsDirective {

  constructor(public templateRef: TemplateRef<any>) {
  }

}

@Directive({
  selector: '[rbSubNavItems]'
})
export class SubNavItemsDirective implements NavItemsDirective {

  constructor(public templateRef: TemplateRef<any>) {
  }

}

@Directive({
  selector: '[rbMetaNavItems]'
})
export class MetaNavItemsDirective implements NavItemsDirective {

  constructor(public templateRef: TemplateRef<any>) {
  }

}

@Directive({
  selector: '[rbActionNavItems]'
})
export class ActionNavItemsDirective implements NavItemsDirective {

  constructor(public templateRef: TemplateRef<any>) {
  }

}
