import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { getAbsolutePosition } from '../../utils/positionUtils';

@Component({
  selector: 'rb-dropdown',
  templateUrl: './dropdown.component.html'
})
export class DropdownComponent implements OnInit, AfterViewChecked {

  @Input() anchor: ElementRef;
  @Input() content: TemplateRef<any>;
  @Input() primaryPos: 'left' | 'right' | 'center' = 'left';
  @Input() autoClose = true;
  @Input() hugContent = false;

  @Output() close = new EventEmitter<string>();

  shown = false;

  context: Record<string, any>;

  @ViewChild('dropdown', {static: true}) popoverElementRef: ElementRef;

  @HostListener('window:click') onAnyClick() {
    if (this.shown) {
      this.doClose('click');
    }
  }

  @HostListener('click', ['$event']) onClick(event: MouseEvent) {
    event.stopPropagation();
    if (this.shown && this.autoClose) {
      this.doClose('click');
    }
  }

  @HostListener('window:resize') onResize() {
    this.positionToAnchor();
  }


  constructor() {
    this.updateContext({});
  }

  ngOnInit() {
    setTimeout(() => {
      this.positionToAnchor();
    });
    this.positionToAnchor();
  }

  show() {
    setTimeout(() => {
      this.shown = true;
    });
    this.popoverElementRef.nativeElement.classList.add('open');
    this.positionToAnchor();
  }

  hide() {
    this.shown = false;
    this.popoverElementRef.nativeElement.classList.remove('open');
  }

  ngAfterViewChecked(): void {
    this.positionToAnchor();
  }

  positionToAnchor() {
    if (!this.anchor || !this.popoverElementRef) {
      return;
    }
    const a = this.anchor.nativeElement;
    const pop = this.popoverElementRef.nativeElement;

    const anchorPos = getAbsolutePosition(a);
    const viewTop = window.pageYOffset;
    const viewBottom = window.innerHeight + window.pageYOffset;
    let isBottom = true;

    if (!this.hugContent) {
      pop.style.minWidth = a.offsetWidth + 'px';
    }

    const pos = {
      x: anchorPos.x,
      y: 0
    };
    if (this.primaryPos === 'center') {
      pos.x += a.offsetWidth / 2 - pop.offsetWidth / 2;
    }
    if (this.primaryPos === 'right') {
      pos.x += a.offsetWidth - pop.offsetWidth;
    }
    pos.y = anchorPos.y + a.offsetHeight;
    if (pos.y + pop.offsetHeight > viewBottom) {
      isBottom = false;
    }
    if (!isBottom) {
      pos.y = anchorPos.y - pop.offsetHeight;
      if (pos.y < 0) {
        isBottom = true;
      }
    }
    if (isBottom) {
      pos.y = anchorPos.y + a.offsetHeight;
    } else {
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

  }

  doClose(reason?) {
    this.close.next(reason);
  }

  updateContext(ctx: Record<string, any>) {
    this.context = {
      ...ctx,
      close: this.doClose.bind(this)
    };
  }

}
