import { Component, OnInit, Input } from '@angular/core';
import { Beer } from 'src/app/dtos/beer.dto';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'bex-beer-details',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-4">
        </div>
        <div class="col-8">
          <h5 class="modal-title">{{ beer!.name }}</h5>
          <button class="close" (click)="closeModal()"><span>&times;</span></button>
          <div class="modal-body">
            <p>{{ beer!.description }}</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          beer
        </div>
        <div class="col-4">
          beer
        </div>
        <div class="col-4">
          beer
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class BeerDetailsComponent implements OnInit {
  @Input() beer: Beer | undefined;

  constructor(private activeModal: NgbActiveModal) { }

  closeModal(): void {
    console.log('click');
    this.activeModal.close('Cross clicked');
  }

  ngOnInit(): void {
  }

}
