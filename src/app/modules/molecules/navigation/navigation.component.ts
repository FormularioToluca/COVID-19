import { Component, Input, OnInit, TemplateRef } from '@angular/core';

export interface NavItemsDirective {
  templateRef: TemplateRef<any>;
}

@Component({
  selector: 'rb-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {

  @Input() type: 'main' | 'sub' | 'meta' | 'action' | 'tab' = 'main'; // type of navigation

  @Input() itemsTemplate: NavItemsDirective;

  constructor() {
  }

  ngOnInit() {
  }

}
