import { Directive, EventEmitter, HostListener, Input, Output, ViewContainerRef } from '@angular/core';

/**
 * Can be toggled to provide a state
 * Usage with: rbDetailsToggle #triggerDetails="rbDetailsToggle"
 * Then check triggerDetails.open for the current state
 */
@Directive({
  selector: '[rbDetailsToggle]',
  exportAs: 'rbDetailsToggle'
})
export class DetailsToggleDirective {

  @Output() isOpenChange = new EventEmitter<boolean>();

  public open = false;

  constructor(private viewContainerRef: ViewContainerRef) {
  }


  @Input() set isOpen(state: boolean) {
    if (state) {
      this.openDetails();
    } else {
      this.closeDetails();
    }
  }

  @HostListener('click', ['$event'])
  onClick(e: MouseEvent) {
    e.preventDefault();
    if (this.open) {
      this.closeDetails();
      this.isOpenChange.next(this.open);
    } else {
      this.openDetails();
      this.isOpenChange.next(this.open);
    }
  }

  openDetails() {
    this.open = true;

    this.viewContainerRef.element.nativeElement.classList.add('open');
  }

  closeDetails() {
    this.open = false;

    this.viewContainerRef.element.nativeElement.classList.remove('open');
  }

}
