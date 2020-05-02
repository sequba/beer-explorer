import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Beer } from 'src/app/dtos/beer.dto';
import { BeerDetailsModalComponent } from '../beer-details-modal/beer-details-modal.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, NEVER, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'bex-beer-details-modal-container',
  template: ``,
  styles: []
})
export class BeerDetailsModalContainerComponent implements OnInit, OnDestroy {
  beerIdFromRoute$: Observable<number> = NEVER;
  private destroyed$ = new Subject<boolean>();

  constructor(private modalService: NgbModal,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.beerIdFromRoute$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id')),
      map(this.parseBeerId));

    this.beerIdFromRoute$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      beerId => this.openDetailsModal(beerId),
      () => this.handleWrongBeerId()
    );
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

  private openDetailsModal(beerId: number): void {
    const modalRef = this.modalService.open(BeerDetailsModalComponent, { centered: true, size: 'lg', windowClass: 'fade' });
    modalRef.componentInstance.beerId = beerId;
    modalRef.result.then(
      (goToBeer?: Beer) => this.modalClosed(goToBeer),
      (reason: any) => reason === 'not-found' ? this.handleWrongBeerId() : this.modalClosed()
    );
  }

  private modalClosed(beer?: Beer): void {
    this.router.navigate(['/']).then(() => {
      if (beer && beer.id) {
        this.router.navigate(['/details', beer.id]);
      }
    });
  }

  private parseBeerId(id: string | null): number {
    const parsed = parseInt(id as string, 10);
    if (isNaN(parsed)) {
      throw new Error(`Cannot parse beer id '${id}'`);
    }
    return parsed;
  }

  private handleWrongBeerId(): void {
    this.router.navigate(['/page-not-found']);
  }
}
