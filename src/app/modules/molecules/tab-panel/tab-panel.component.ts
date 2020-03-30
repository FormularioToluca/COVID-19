import {
  AfterViewInit,
  Component,
  ContentChildren,
  DoCheck,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  InjectionToken, Input, OnChanges,
  Optional,
  Output,
  QueryList,
  Renderer2, SimpleChanges,
  ViewChild
} from '@angular/core';
import { TabPanelItemDirective } from './tab-panel-item.directive';
import { Observable } from 'rxjs';

export interface TabPanelResolver {
  /**
   * Resolves a tab by id and returns an Observable, that emits true, when it was found.
   */
  resolveTab(id: string): Observable<boolean>;
}

export const TAB_PANEL_RESOLVER = new InjectionToken<TabPanelResolver>('TabPanelResolver');

/**
 * A very powerful tab panel component.
 * It can handle dynamic tabs, the tab bar can accept all kind of types. See: TabPanelItemType
 * When you provide `outletName`, you should provide your router config with such an entry to enable the outlet routing:
 * children: [{path: ':id', outlet: 'yourOutletName', component: TabPanelComponent}]
 */
@Component({
  selector: 'rb-tab-panel',
  templateUrl: './tab-panel.component.html'
})
export class TabPanelComponent implements AfterViewInit, DoCheck, OnChanges {

  @Output() tabChanged = new EventEmitter<string>();

  /**
   * change this input to an tab id to open that tab.
   */
  @Input() tab: string;

  @ViewChild('panelPlaceholder', {static: true}) panelPlaceholder: ElementRef;
  @ViewChild('tabPanel', {static: true}) tabPanel: ElementRef;

  outletName: string;

  tabItems: TabPanelItemDirective[] = [];

  /**
   * Whether tabs that were opened once, should be kept in the DOM
   * when switching away from them. Or should they be removed from
   * DOM when switched to another tab?
   */
  @Input()
  destroyTabs = false;

  @Input()
  renderHiddenTabs = false;

  tabItemsLeft: TabPanelItemDirective[];
  tabItemsCenter: TabPanelItemDirective[];
  tabItemsRight: TabPanelItemDirective[];

  lastHeight = 0;

  constructor(private renderer: Renderer2,
              private element: ElementRef,
              @Optional() @Inject(TAB_PANEL_RESOLVER) private tabPanelResolver: TabPanelResolver) {
  }


  @ContentChildren(TabPanelItemDirective) set tabItemsQuery(tabItems: QueryList<TabPanelItemDirective>) {
    this.tabItems = tabItems.toArray();
    if (this.outletName) {
      this.tabItems.forEach(tabItem => {
        const link = {outlets: {}};
        link.outlets[this.outletName] = [tabItem.id];
        tabItem.routerLink = [link];
      });
    }

    if (this.tabItems.length && this.tabItems.every(tabItem => !tabItem.active)) {
      if (this.tab) {
        this.showTab(this.tab);
      } else {
        this.showFirstTab();
      }
    }
    this.tabItemsLeft = this.tabItems.filter(tabItem => tabItem.position === 'left');
    this.tabItemsCenter = this.tabItems.filter(tabItem => tabItem.position === 'center');
    this.tabItemsRight = this.tabItems.filter(tabItem => tabItem.position === 'right');
  }


  ngAfterViewInit() {
    this.onResize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tab && changes.tab.currentValue && !changes.tab.firstChange) {
      const found = this.tabItems.find(tabItem => tabItem.id === changes.tab.currentValue);
      if (found && !found.active) {
        this.showTab(changes.tab.currentValue);
      }
    }
  }

  ngDoCheck() {
    if (this.element && this.element.nativeElement.classList.contains('full-width')) {
      this.onResize();
    }
  }

  public showFirstTab() {
    const firstItem = this.tabItems.find(tabItem => tabItem.type === 'tab');
    if (firstItem) {
      this.showTab(firstItem.id);
    }
  }

  /**
   * Can be used to show a certain tab.
   */
  public showTab(id: string) {
    const found = this.tabItems.find(tabItem => tabItem.id === id);
    if (!found) {
      // wait a tick
      setTimeout(() => {
        this.deactivateAndShowTab(id);
      });
    } else {
      this.deactivateAndShowTab(id);
    }
  }

  private deactivateAndShowTab(id: string) {
    this.tabItems.forEach(tabItem => {
      if (tabItem.active && tabItem.id !== id) {
        tabItem.hide();
      } else if (tabItem.id === id) {
        tabItem.show();
        this.tabChanged.next(id);
      }
    });
  }

  @HostListener('window:resize')
  onResize() {
    if (this.panelPlaceholder && this.tabPanel) {
      const tabPanelHeight = this.tabPanel.nativeElement.offsetHeight;
      if (Math.abs(this.lastHeight - tabPanelHeight) > 2) {
        this.lastHeight = tabPanelHeight;
        this.renderer.setStyle(this.panelPlaceholder.nativeElement, 'height', tabPanelHeight + 'px');
      }
    }
  }

}
