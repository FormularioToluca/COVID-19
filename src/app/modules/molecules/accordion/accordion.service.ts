import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AccordionService {

  updateState = new Subject<any>();

  constructor() {
  }
}
