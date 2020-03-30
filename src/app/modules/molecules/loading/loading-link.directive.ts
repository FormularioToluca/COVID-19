import { AfterContentInit, ContentChildren, Directive, ElementRef, Input, OnDestroy, QueryList, Renderer2 } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterLinkWithHref } from '@angular/router';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[rbLoadingLink]'
})
export class LoadingLinkDirective implements AfterContentInit, OnDestroy {
  private subscription: Subscription;
  private loading = false;

  className = 'loading';

  @ContentChildren(RouterLinkWithHref, {descendants: true}) linksWithHrefs: QueryList<RouterLinkWithHref>;

  constructor(private router: Router, private element: ElementRef, private renderer: Renderer2) {
    this.subscription = router.events.subscribe(s => {
      if (s instanceof NavigationStart && this.isRelevantUrl(s.url)) {
        this.loading = true;
        this.update();
      }
      if (s instanceof NavigationEnd) {
        this.loading = false;
        this.update();
      }
    });
  }

  @Input() set rbLoadingLink(className: string) {
    if (className) {
      this.className = className;
    }
  }

  ngAfterContentInit(): void {
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  update() {
    if (!this.element || !this.element.nativeElement) {
      return;
    }
    if (this.loading) {
      this.renderer.addClass(this.element.nativeElement, this.className);
    } else {
      this.renderer.removeClass(this.element.nativeElement, this.className);
    }
  }

  private isRelevantUrl(url: string) {
    return this.linksWithHrefs.some(link => url === link.urlTree.toString());
  }

}
