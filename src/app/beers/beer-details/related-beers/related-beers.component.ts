import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Beer } from 'src/app/dtos/beer.dto';

@Component({
  selector: 'bex-related-beers',
  template: `
    <div class="row" *ngIf="beers">
      <div *ngFor="let beer of beers" class="col-sm-4 p-sm-1">
        <bex-beer-list-item [beer]="beer" (itemSelected)="relatedBeerSelected($event)"></bex-beer-list-item>
      </div>
    </div>
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
