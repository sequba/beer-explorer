import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bex-page-header',
  template: `
    <h1 class="my-3">BEERGURU</h1>
  `,
  styles: []
})
export class PageHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
