import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'rb-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {

  @Input() alertTitle: string;

  @Input() okBtnLabel: string;

  @Input() cancelBtnLabel: string;

  @Input() type: 'error' | 'warning' | 'success' = 'success';

  constructor(private modalService: ModalService) {
  }

  ngOnInit() {
  }

  close(reason?) {
    this.modalService.close(reason);
  }

}
