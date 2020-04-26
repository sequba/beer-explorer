import { Component, OnInit, Input } from '@angular/core';
import { Beer } from 'src/app/dtos/beer.dto';

@Component({
  selector: 'bex-beer-list-item',
  template: `
        <div class="card py-3">
        <img class="card-img-top" src="{{ data!.image_url }}" alt="Photo of the beer">
          <div class="card-body text-center">
            <h6 class="card-subtitle">{{ data!.name }}</h6>
            <p class="card-text text-muted">{{ data!.tagline }}</p>
          </div>
        </div>
  `,
  styles: [`
    .card {
      height: 14rem;
    }

    .card-img-top {
      height: 8rem;
      object-fit: contain;
    }

    .card-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `]
})
export class BeerListItemComponent implements OnInit {
  @Input() data: Beer | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
