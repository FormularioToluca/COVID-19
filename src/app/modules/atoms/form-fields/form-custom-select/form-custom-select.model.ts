import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';

export interface FormSelectAction {
  type: 'update' | 'write';
  value: any;
}

export const FORM_SELECT_SELECTOR = new InjectionToken<Subject<FormSelectAction>>('formCustomSelectSelectorSubject');
