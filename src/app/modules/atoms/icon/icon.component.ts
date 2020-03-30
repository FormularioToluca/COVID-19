/* tslint:disable */
import { Component, Input, OnInit } from '@angular/core';

/**
 * @Deprecated use the icon font with rb-ic css class
 */
@Component({
  selector: 'rb-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  @Input() name: string;

  basePath = 'assets/img/icons.svg';

  constructor() {
  }


  ngOnInit() {
    // if it is MSIE
    if (!!document['documentMode'] && window['XMLHttpRequest']) {
      if (!document.getElementById('rb-icons')) {

        const iconsEl = document.createElement('div');
        iconsEl.id = 'rb-icons';
        iconsEl.style.display = 'none';
        document.body.appendChild(iconsEl);

        const http = new window['XMLHttpRequest']();
        http.onreadystatechange = () => { //Call a function when the state changes.
          if (http.readyState == 4 && http.status == 200) {
            iconsEl.innerHTML = http.responseText;
          }
        };
        http.open('GET', this.basePath, true);
        http.send();
      }

      this.basePath = '';
    }
  }
}
