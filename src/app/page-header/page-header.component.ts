import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bex-page-header',
  template: `
    <h1 class="mt-5 mb-4"><span class="text-primary">BEER</span>EX</h1>
  `,
  styles: []
})
export class PageHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
