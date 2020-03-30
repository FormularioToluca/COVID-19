import { ContentChild, Directive, Input, TemplateRef } from '@angular/core';
import { TabPanelTitleDirective } from './tab-panel-title.directive';
import { Params } from '@angular/router';

export type TabPanelItemType = 'tab' | 'dropdown' | 'text' | 'content' | 'custom';
export type TabPanelItemPosition = 'left' | 'right' | 'center';

let tabItemNum = 0;

@Directive({
  selector: '[rbTabPanelItem]'
})
export class TabPanelItemDirective {

  id: string;

  @Input() rbTabPanelItemPosition: TabPanelItemPosition = 'left';
  @Input() rbTabPanelItemType: TabPanelItemType = 'tab';
  @Input() rbTabPanelItemAutoClose = true; // dropdown option
  @Input() rbTabPanelItemQueryParams: Params; // additional query params for routing

  routerLink: any[] = null;

  details: any;

  active = false;
  shown = 0;

  titleTpl: TemplateRef<any> = null;
  titleStr: any = null;

  constructor(public templateRef: TemplateRef<any>) {
    this.id = 'tabItem' + (tabItemNum++);
  }

  @ContentChild(TabPanelTitleDirective, {static: false}) set titleItem(title: TabPanelTitleDirective) {
    if (title && !this.titleTpl) {
      this.titleTpl = title.templateRef;
    }
  }

  @Input() set rbTabPanelItemDetails(details: any) {
    this.details = details;
  }

  @Input() set rbTabPanelItemId(id: string) {
    this.id = id;
  }

  @Input() set rbTabPanelItem(title: any) {
    if (title instanceof TemplateRef) {
      this.titleTpl = title;
    } else {
      this.titleStr = title;
    }
  }

  show() {
    this.active = true;
    this.shown++;
  }

  hide() {
    this.active = false;
  }

  get position() {
    return this.rbTabPanelItemPosition;
  }

  get type() {
    return this.rbTabPanelItemType;
  }

  get autoClose() {
    return this.rbTabPanelItemAutoClose;
  }

}
