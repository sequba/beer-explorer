import { Component, OnInit, Input } from '@angular/core';
import { Beer } from 'src/app/dtos/beer.dto';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'bex-beer-details-modal',
  template: `
    <div class="modal-header">
      <button class="close p-2" (click)="closeModal()"><span>&times;</span></button>
    </div>
    <div class="modal-body pt-0">
      <div class="container-fluid">
        <bex-beer-description [beer]="beer"></bex-beer-description>
        <p class="font-weight-bold">You might also like:</p>
        <bex-related-beers [beers]="[beer, beer, beer]" (itemSelected)="goToDetails($event)"></bex-related-beers>
      </div>
    </div>
  `,
  styles: [`
    .modal-header {
      border: none;
    }
  `]
})
export class BeerDetailsModalComponent implements OnInit {
  @Input() beer: Beer | undefined;

  constructor(private activeModal: NgbActiveModal) { }

  closeModal(beer?: Beer): void {
    this.activeModal.close(beer);
  }

  goToDetails(beer: Beer): void {
    this.closeModal(beer);
  }

  ngOnInit(): void {
  }

}
