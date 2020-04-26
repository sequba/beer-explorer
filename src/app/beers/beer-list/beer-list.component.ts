import { Component, OnInit } from '@angular/core';
import { BeersQuery } from '../state/beers.query';
import { BeersService } from '../state/beers.service';

@Component({
  selector: 'bex-beer-list',
  template: `
    <div class="row" *ngIf="(beers$ | async) as beers">
      <div *ngFor="let beer of beers" class="p-sm-1 col-sm-6 col-md-4 col-lg-3">
        <bex-beer-list-item [data]="beer"></bex-beer-list-item>
      </div>
    </div>
    <!-- <loading> -->
  `,
  styles: []
})
export class BeerListComponent implements OnInit {
  beers$ = this.beersQuery.allBeers$;

  constructor(private beersQuery: BeersQuery,
              private beersService: BeersService) { }

  ngOnInit(): void {
    this.beersService.loadMore().subscribe();
  }

}
