import { Component, ContentChild, ContentChildren, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { BoardItemBodyDirective, BoardItemCountDirective, BoardItemIconDirective } from './board-item.directive';

@Component({
  selector: 'rb-board-item',
  templateUrl: './board-item.component.html'
})
export class BoardItemComponent implements OnInit {

  @Input() statusIcon: string | TemplateRef<any>;

  @ContentChild(BoardItemIconDirective, {static: false}) icon: BoardItemIconDirective;
  @ContentChild(BoardItemBodyDirective, {static: false}) body: BoardItemBodyDirective;
  @ContentChildren(BoardItemCountDirective) counts: QueryList<BoardItemCountDirective>;

  constructor() {
  }

  ngOnInit() {
  }

  isTemplateStatus() {
    return this.statusIcon instanceof TemplateRef;
  }


}
