import { Component, DoCheck, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'rb-footer-nav',
  templateUrl: './footer-nav.component.html'
})
export class FooterNavComponent implements OnInit, DoCheck {

  @ViewChild('footer', { static: true }) footerEl: ElementRef;
  @ViewChild('placeholder', { static: true }) placeholderEl: ElementRef;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
    this.checkSticky();
  }

  ngDoCheck() {
    this.checkSticky();
  }

  @HostListener('window:resize') onResize() {
    this.checkSticky();
  }

  checkSticky() {
    const footer = this.footerEl.nativeElement;
    const footerHeight = footer.offsetHeight;
    const windowHeight = window.innerHeight;
    const bottomBorder = footer.offsetTop + footer.offsetHeight;
    const realContentHeight = (document.body.firstElementChild as HTMLElement).offsetHeight;
    const sticky = footer.classList.contains('sticky');

    if (!sticky && bottomBorder < windowHeight) {
      this.renderer.addClass(footer, 'sticky');
      this.renderer.setStyle(this.placeholderEl.nativeElement, 'height', footerHeight + 'px');
    } else if (sticky && realContentHeight >= windowHeight) {
      this.renderer.removeClass(footer, 'sticky');
    }
  }

}
