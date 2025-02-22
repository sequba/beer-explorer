import { Component, OnInit } from '@angular/core';
import { BeersQuery } from './state/beers.query';
import { BeersService } from './state/beers.service';
import { Beer } from 'src/app/dtos/beer.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'bex-beer-list',
  template: `
    <router-outlet></router-outlet>
    <div class="row" *ngIf="(beers$ | async) as beers"
      infiniteScroll
      [infiniteScrollDistance]="2"
      [infiniteScrollThrottle]="50"
      [immediateCheck]="true"
      (scrolled)="loadMoreBeers()">

      <div *ngFor="let beer of beers" class="p-sm-1 col-sm-6 col-md-4 col-lg-3">
        <bex-beer-list-item [beer]="beer" (itemSelected)="goToDetails($event)"></bex-beer-list-item>
      </div>

      <div *ngIf="isLoading$ | async" class="col-12 my-2">
        <bex-loading></bex-loading>
      </div>

      <div *ngIf="outOfBeers$ | async" class="col-12 my-2 text-center">
        <h4>That's it. We have no more beers for you.</h4>
      </div>

    </div>
  `,
  styles: []
})
export class BeerListComponent implements OnInit {
  beers$ = this.beersQuery.allBeers$;
  outOfBeers$ = this.beersQuery.outOfBeers$;
  isLoading$ = this.beersQuery.selectLoading();

  constructor(private beersQuery: BeersQuery,
              private beersService: BeersService,
              private router: Router) { }

  goToDetails(beer: Beer): void {
    this.router.navigate(['/details', beer.id]);
  }

  ngOnInit(): void {
    this.loadMoreBeers();
  }

  loadMoreBeers(): void {
    this.beersService.loadMore();
  }
}
