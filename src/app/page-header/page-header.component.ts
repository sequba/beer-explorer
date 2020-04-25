import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bex-page-header',
  template: `
    <h1 class="mt-5">BEERGURU</h1>
  `,
  styles: []
})
export class PageHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
