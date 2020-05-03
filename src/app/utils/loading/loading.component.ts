import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bex-loading',
  template: `
    <div class="text-center">
      <div class="spinner-border text-primary"></div>
    </div>
  `,
  styles: []
})
export class LoadingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
