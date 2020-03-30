import { AfterViewInit, Component, ComponentRef, ElementRef, OnInit, TemplateRef, Type, ViewChild, ViewContainerRef } from '@angular/core';

export interface ModalOptions {
  position?: 'middle' | 'top' | 'bottom';
  showClose?: boolean;  // show the close button on top right
  maxWidth?: string;
  stacked?: boolean; // whether to stack this on top of another open modal
  backdropClose?: boolean; // close if backdrop is clicked or ESC key is pressed
}

@Component({
  selector: 'rb-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit, AfterViewInit {

  contentText: string;
  contentTpl: TemplateRef<any>;
  contentComponent: Type<any>;
  contentComponentRef: ComponentRef<any>;
  options: ModalOptions = {
    position: 'middle',
    showClose: true,
    backdropClose: true
  };
  close: (reason?: any) => void;

  componentInstance: any;

  @ViewChild('box', { static: true }) box: ElementRef;

  constructor(private elementRef: ElementRef, private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {

    if (this.options.maxWidth) {
      this.elementRef.nativeElement.style.maxWidth = this.options.maxWidth;
    }
    if (this.options.position) {
      this.elementRef.nativeElement.classList.add(this.options.position);
    }

    if (this.contentComponentRef && this.box) {
      this.viewContainerRef.insert(this.contentComponentRef.hostView);
    }
  }

  ngAfterViewInit(): void {
    if (this.contentComponentRef && this.box) {
      this.box.nativeElement.appendChild(this.contentComponentRef.location.nativeElement);
    }
  }
}
