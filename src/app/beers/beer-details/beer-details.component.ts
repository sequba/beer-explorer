import { Component, OnInit, Input } from '@angular/core';
import { Beer } from 'src/app/dtos/beer.dto';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'bex-beer-details',
  template: `
    <div class="modal-header">
      <button class="close p-2" (click)="closeModal()"><span>&times;</span></button>
    </div>
    <div class="modal-body pt-0">
      <div class="container-fluid">
        <bex-beer-description [beer]="beer"></bex-beer-description>
        <bex-related-beers [beers]="[beer, beer, beer]" (itemSelected)="showDetails($event)"></bex-related-beers>
      </div>
    </div>
  `,
  styles: [`
    .modal-header {
      border: none;
    }
  `]
})
export class BeerDetailsComponent implements OnInit {
  @Input() beer: Beer | undefined;

  constructor(private activeModal: NgbActiveModal) { }

  closeModal(): void {
    this.activeModal.close();
  }

  showDetails(beer: Beer): void {
    // navigate or close modal with data
  }

  ngOnInit(): void {
  }

}
