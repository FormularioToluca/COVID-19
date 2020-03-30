import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface LanguageItem {
  id: string;
  name: string;
}

@Component({
  selector: 'rb-language-selector',
  templateUrl: './language-selector.component.html'
})
export class LanguageSelectorComponent implements OnInit {

  @Input() languages: LanguageItem[];
  @Input() language: string;
  @Output() languageChange = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  selectLanguage(l: LanguageItem) {
    this.language = l.id;
    this.languageChange.next(this.language);
  }

}
