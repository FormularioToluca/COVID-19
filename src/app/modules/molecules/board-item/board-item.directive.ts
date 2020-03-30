import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[rbBoardItemIcon]'
})
export class BoardItemIconDirective {

  constructor(public templateRef: TemplateRef<any>) { }

}

@Directive({
  selector: '[rbBoardItemBody]'
})
export class BoardItemBodyDirective {

  constructor(public templateRef: TemplateRef<any>) { }

}

@Directive({
  selector: '[rbBoardItemCount]'
})
export class BoardItemCountDirective {

  constructor(public templateRef: TemplateRef<any>) { }

}
