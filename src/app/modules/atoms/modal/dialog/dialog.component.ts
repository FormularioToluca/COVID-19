import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'rb-dialog',
  templateUrl: './dialog.component.html'
})
export class DialogComponent implements OnInit {

  @Input() dialogTitle: string;

  @Input() okBtnLabel: string;

  @Input() cancelBtnLabel: string;

  @Input() showButtons = true;

  constructor(private modalService: ModalService) {
  }

  ngOnInit() {
  }

  close(reason?) {
    this.modalService.close(reason);
  }

}
