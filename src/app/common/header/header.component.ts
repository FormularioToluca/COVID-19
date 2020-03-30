import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public logged = null;
  constructor() {
    this.logged =JSON.parse(localStorage.getItem('user'));
    console.log(this.logged);
    
  }

  hidden = false;
  ngOnInit() {
  }

}
