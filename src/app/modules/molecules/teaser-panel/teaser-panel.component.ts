import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rb-teaser-panel',
  templateUrl: './teaser-panel.component.html'
})
export class TeaserPanelComponent implements OnInit {

  /**
   * Size of one teaser for the width.
   * Depending on that it is automatically determined how many columns are used
   */
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  constructor() { }

  ngOnInit() {
  }

}
