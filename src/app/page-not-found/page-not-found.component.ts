import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bex-page-not-found',
  template: `
    <div class="card">
      <h3>Requested page not found</h3>
    </div>
  `,
  styles: [`
    .card {
      margin-top: 6rem;
      padding: 1rem;
      text-align: center;
    }
  `]
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
