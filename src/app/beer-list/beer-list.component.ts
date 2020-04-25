import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bex-beer-list',
  template: `
    <div class="row">
      <div *ngFor="let item of items" class="p-sm-1 col-sm-6 col-md-4 col-lg-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Beer #1</h5>
            <h6 class="card-subtitle mb-2 text-muted">Beer is gooooood</h6>
            <p class="card-text">Beer beer beer</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class BeerListComponent implements OnInit {
  items = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

  constructor() { }

  ngOnInit(): void {
  }

}
