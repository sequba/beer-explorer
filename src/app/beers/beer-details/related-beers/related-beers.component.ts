import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Beer } from 'src/app/dtos/beer.dto';

@Component({
  selector: 'bex-related-beers',
  template: `
    <ng-container *ngIf="beers && beers!.length > 0">
      <p class="font-weight-bold">You might also like:</p>
      <div class="row">
        <div *ngFor="let beer of beers" class="col-sm-4 p-sm-1">
          <bex-beer-list-item [beer]="beer" (itemSelected)="relatedBeerSelected($event)"></bex-beer-list-item>
        </div>
      </div>
    </ng-container>
    <p *ngIf="beers && beers!.length === 0" class="text-center font-weight-bold">
      This beer is so original that we were unable to find anythong similar in our collection.
    </p>
  `,
  styles: []
})
export class RelatedBeersComponent implements OnInit {
  @Input() beers: Beer[] | undefined;
  @Output() itemSelected = new EventEmitter<Beer>();

  constructor() { }

  relatedBeerSelected(beer: Beer): void {
    this.itemSelected.next(beer);
  }

  ngOnInit(): void {
  }

}
