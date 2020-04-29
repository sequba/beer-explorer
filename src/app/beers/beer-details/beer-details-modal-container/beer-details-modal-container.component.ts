import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Beer } from 'src/app/dtos/beer.dto';
import { BeerDetailsModalComponent } from '../beer-details-modal/beer-details-modal.component';
import { PunkApiService } from 'src/app/punk-api/punk-api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, NEVER, Subject } from 'rxjs';
import { map, filter, switchMap, takeUntil, catchError } from 'rxjs/operators';

@Component({
  selector: 'bex-beer-details-modal-container',
  template: ``,
  styles: []
})
export class BeerDetailsModalContainerComponent implements OnInit, OnDestroy {
  beerIdFromRoute$: Observable<number> = NEVER;
  private destroyed$ = new Subject<boolean>();

  constructor(private apiService: PunkApiService,
              private modalService: NgbModal,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.beerIdFromRoute$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id')),
      map(id => {
        const parsed = parseInt(id as string, 10);
        if (isNaN(parsed)) {
          throw new Error(`Cannot parse beer id '${id}'`);
        }
        return parsed;
    }));

    this.beerIdFromRoute$.pipe(
      switchMap(id => this.apiService.fetchBeerById(id)),
      takeUntil(this.destroyed$)
    ).subscribe(beer => {
      this.openDetailsModal(beer[0]);
    }, error => {
      // TODO
      console.log(error);
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
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
        this.router.navigate(['/details', beer.id]);
      }
    });
  }
}
