import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Beer } from 'src/app/dtos/beer.dto';

@Component({
  selector: 'bex-beer-list-item',
  template: `
    <div class="card py-3" (click)="itemClicked()">
      <img class="card-img-top" src="{{ beer?.image_url }}" alt="Photo of the beer">
      <div class="card-body text-center">
        <h6 class="card-subtitle text-primary">{{ beer?.name }}</h6>
        <p class="card-text text-muted text-truncate">{{ beer?.tagline }}</p>
      </div>
    </div>
  `,
  styles: [`
    .card {
      height: 14rem;
      cursor: pointer;
    }

    .card-img-top {
      height: 8rem;
    }
  `]
})
export class BeerListItemComponent implements OnInit {
  @Input() beer: Beer | undefined;
  @Output() itemSelected: EventEmitter<Beer> = new EventEmitter<Beer>();

  constructor() { }

  itemClicked(): void {
    if (this.beer) {
      this.itemSelected.next(this.beer);
    }
  }

  ngOnInit(): void {
  }
}
