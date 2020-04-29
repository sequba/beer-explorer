import { Component, OnInit } from '@angular/core';
import { BeersQuery } from '../state/beers.query';
import { BeersService } from '../state/beers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BeerDetailsModalComponent } from '../beer-details/beer-details-modal/beer-details-modal.component';
import { Beer } from 'src/app/dtos/beer.dto';

@Component({
  selector: 'bex-beer-list',
  template: `
    <router-outlet></router-outlet>
    <div class="row" *ngIf="(beers$ | async) as beers">
      <div *ngFor="let beer of beers" class="p-sm-1 col-sm-6 col-md-4 col-lg-3">
        <bex-beer-list-item [beer]="beer" (itemSelected)="showDetails($event)"></bex-beer-list-item>
      </div>
    </div>
    <!-- <loading> -->
  `,
  styles: []
})
export class BeerListComponent implements OnInit {
  beers$ = this.beersQuery.allBeers$;

  constructor(private beersQuery: BeersQuery,
              private beersService: BeersService,
              private modalService: NgbModal) { }

  showDetails(beer: Beer): void {
    const modalRef = this.modalService.open(BeerDetailsModalComponent, { centered: true, size: 'lg', windowClass: 'fade' });
    modalRef.componentInstance.beer = beer;
  }

  ngOnInit(): void {
    this.beersService.loadMore().subscribe();
    // unsubscribe!!
  }

}
