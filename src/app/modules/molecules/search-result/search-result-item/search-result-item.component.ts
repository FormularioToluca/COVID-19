import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'rb-search-result-item',
  templateUrl: './search-result-item.component.html'
})
export class SearchResultItemComponent implements OnInit {

  @Input() page: string | TemplateRef<any>;

  @Input() itemTitle: string | TemplateRef<any>;

  constructor() {
  }

  ngOnInit() {
  }

  isTemplate(source: string | TemplateRef<any>) {
    return source instanceof TemplateRef;
  }

}
