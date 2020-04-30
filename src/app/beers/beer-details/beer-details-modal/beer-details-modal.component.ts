import { Component, OnInit, Input } from '@angular/core';
import { Beer } from 'src/app/dtos/beer.dto';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PunkApiService } from 'src/app/punk-api/punk-api.service';
import { Observable, NEVER } from 'rxjs';
import { map } from 'rxjs/operators';

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
        <bex-related-beers [beers]="[]" (itemSelected)="goToDetails($event)"></bex-related-beers>
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
  beer$: Observable<Beer> = NEVER;
  @Input() set beerId(beerId: number | undefined) {
    if (beerId !== undefined) {
      this.beer$ = this.apiService.fetchBeerById(beerId).pipe(map(beers => beers[0]));
    }
  }

  constructor(private apiService: PunkApiService,
              private activeModal: NgbActiveModal) { }

  closeModal(beer?: Beer): void {
    this.activeModal.close(beer);
  }

  goToDetails(beer: Beer): void {
    this.closeModal(beer);
  }

  ngOnInit(): void {
  }

}
