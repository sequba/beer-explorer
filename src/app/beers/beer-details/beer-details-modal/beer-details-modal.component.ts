import { Component, OnInit, Input } from '@angular/core';
import { Beer } from 'src/app/dtos/beer.dto';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, ReplaySubject } from 'rxjs';
import { BeerDetailsService } from '../beer-details-service/beer-details.service';
import { share, switchMap, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'bex-beer-details-modal',
  template: `
    <div class="modal-header">
      <button class="close p-2" (click)="closeModal()"><span>&times;</span></button>
    </div>
    <div class="modal-body pt-0">
      <div class="container-fluid">
        <bex-beer-description [beer]="beer$ | async"></bex-beer-description>
        <p class="font-weight-bold">You might also like:</p>
        <bex-related-beers [beers]="relatedBeers$ | async" (itemSelected)="goToDetails($event)"></bex-related-beers>
      </div>
    </div>
    <!-- loading -->
  `,
  styles: [`
    .modal-header {
      border: none;
    }
  `]
})
export class BeerDetailsModalComponent implements OnInit {
  beer$: Observable<Beer>;
  relatedBeers$: Observable<Beer[]>;
  private beerId$ = new ReplaySubject<number>(1);

  @Input() set beerId(beerId: number | undefined) {
    if (beerId !== undefined) {
      this.beerId$.next(beerId);
    }
  }

  constructor(
    private detailsService: BeerDetailsService,
    private activeModal: NgbActiveModal
  ) {
    this.beer$ = this.beerId$.pipe(
      distinctUntilChanged(),
      switchMap(id => this.detailsService.getBeerById(id)),
      share()
    );

    this.relatedBeers$ = this.beer$.pipe(
      switchMap(beer => this.detailsService.getRelatedBeers(beer))
    );
  }

  closeModal(beer?: Beer): void {
    this.activeModal.close(beer);
  }

  goToDetails(beer: Beer): void {
    this.closeModal(beer);
  }

  ngOnInit(): void {}
}
