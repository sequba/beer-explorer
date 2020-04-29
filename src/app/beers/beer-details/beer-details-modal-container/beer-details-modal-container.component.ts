import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Beer } from 'src/app/dtos/beer.dto';
import { BeerDetailsModalComponent } from '../beer-details-modal/beer-details-modal.component';
import { PunkApiService } from 'src/app/punk-api/punk-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bex-beer-details-modal-container',
  template: ``,
  styles: []
})
export class BeerDetailsModalContainerComponent implements OnInit {

  constructor(private apiService: PunkApiService,
              private modalService: NgbModal,
              private router: Router) {}

  ngOnInit(): void {
    this.apiService.fetchBeerById(42).subscribe(beer => {
      this.openDetailsModal(beer[0]);
    });
    // unsubscribe!!!
  }

  private openDetailsModal(beer: Beer): void {
    const modalRef = this.modalService.open(BeerDetailsModalComponent, { centered: true, size: 'lg', windowClass: 'fade' });
    modalRef.componentInstance.beer = beer;
    modalRef.result.then(
      (goToBeer?: Beer) => this.modalClosed(goToBeer),
      (goToBeer?: Beer) => this.modalClosed(goToBeer)
    );
  }

  private modalClosed(beer?: Beer): void {
    this.router.navigate(['/']).then(() => {
      if (beer && beer.id) {
        this.router.navigate(['details', beer.id]);
      }
    });
  }
}
