import {
  AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, TemplateRef,
  ViewChild
} from '@angular/core';
import { getAbsolutePosition } from '../../utils/positionUtils';

@Component({
  selector: 'rb-popover',
  templateUrl: './popover.component.html'
})
export class PopoverComponent implements OnInit, AfterViewInit {

  @Input() anchor: ElementRef | HTMLElement;
  @Input() content: TemplateRef<any> | string;
  @Input() primaryPos: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  @Output() close = new EventEmitter<string>();

  private mouseIn = false;
  private initialized = false;

  context: any;

  @ViewChild('popover', {static: true}) popoverElementRef: ElementRef;
  @ViewChild('arrow', {static: true}) arrowElementRef: ElementRef;

  @HostListener('mouseenter') onMouseEnter() {
    this.mouseIn = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.mouseIn = false;
  }

  @HostListener('window:click') onAnyClick() {
    if (!this.mouseIn && this.initialized) {
      this.close.next('click');
    }
  }

  @HostListener('window:resize') onResize() {
    this.positionToAnchor();
  }


  constructor() {
    this.context = {
      close: this.doClose.bind(this)
    };
  }

  ngOnInit() {
    setTimeout(() => {
      this.initialized = true;
      this.positionToAnchor();
    });
    this.positionToAnchor();
  }


  ngAfterViewInit() {
    this.positionToAnchor();
  }

  doClose() {
    this.close.next();
  }

  positionToAnchor() {
    if (!this.anchor || !this.popoverElementRef) {
      return;
    }

    const a = this.anchor instanceof HTMLElement ? this.anchor : this.anchor.nativeElement;
    const pop = this.popoverElementRef.nativeElement;
    const arrow = this.arrowElementRef.nativeElement;

    const anchorPos = getAbsolutePosition(a);

    if (this.primaryPos === 'top' || this.primaryPos === 'bottom') {
      anchorPos.x += a.offsetWidth / 2;
      let isBottom = this.primaryPos === 'bottom';


      const pos = {
        x: anchorPos.x - pop.offsetWidth / 2,
        y: 0
      };
      if (!isBottom) {
        pos.y = anchorPos.y - pop.offsetHeight - arrow.offsetHeight / 2;
        if (pos.y < 0) {
          isBottom = true;
        }
      }
      if (isBottom) {
        pos.y = anchorPos.y + a.offsetHeight + arrow.offsetHeight / 2;
        arrow.classList.remove('bottom');
      } else {
        arrow.classList.add('bottom');
      }

      if (pos.x + pop.offsetWidth > window.innerWidth) {
        pos.x = window.innerWidth - pop.offsetWidth;
      }
      if (pos.x < 0) {
        pos.x = 0;
      }

      const popParentPos = getAbsolutePosition(pop.offsetParent);
      pos.y -= popParentPos.y;
      pos.x -= popParentPos.x;

      pop.style.top = pos.y + 'px';
      pop.style.left = pos.x + 'px';

      const arrowX = anchorPos.x - (pos.x + popParentPos.x) - arrow.offsetWidth / 2;

      arrow.style.left = arrowX + 'px';
    }

    if (this.primaryPos === 'left' || this.primaryPos === 'right') {
      anchorPos.y += a.offsetHeight / 2;
      let isRight = this.primaryPos === 'right';

      const pos = {
        x: 0,
        y: anchorPos.y - pop.offsetHeight / 2,
      };
      if (!isRight) {
        pos.x = anchorPos.x - pop.offsetWidth - arrow.offsetWidth / 2;
        if (pos.x < 0) {
          isRight = true;
        }
      }
      if (isRight) {
        pos.x = anchorPos.x + a.offsetWidth + arrow.offsetWidth / 2;
        arrow.classList.remove('right');
        arrow.classList.add('left');
      } else {
        arrow.classList.add('right');
        arrow.classList.remove('left');
      }

      if (pos.y < 0) {
        pos.y = 0;
      }

      const popParentPos = getAbsolutePosition(pop.offsetParent);
      pos.y -= popParentPos.y;
      pos.x -= popParentPos.x;

      pop.style.top = pos.y + 'px';
      pop.style.left = pos.x + 'px';

      const arrowY = anchorPos.y - (pos.y + popParentPos.y) - arrow.offsetHeight / 2;

      arrow.style.top = arrowY + 'px';
    }


  }

  isTemplate() {
    return this.content instanceof TemplateRef;
  }

}
