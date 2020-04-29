import { Component, OnInit, Input } from '@angular/core';
import { Beer } from 'src/app/dtos/beer.dto';

@Component({
  selector: 'bex-beer-description',
  template: `
    <div class="row">
      <div class="col-2 col-sm-3 col-lg-2">
        <img class="img-fluid mb-3" src="{{ beer!.image_url }}" alt="Photo of the beer">
      </div>
      <div class="col-10 col-sm-9 col-lg-10">
        <h4 class="modal-title">{{ beer!.name }}</h4>
        <h6 class="modal-subtitle text-muted">{{ beer!.tagline }}</h6>
        <div class="border-top border-primary"></div>
        <div class="row">
          <span class="col-sm-4 col-lg-2"><span class="font-weight-bold">IBU:</span> {{ beer!.ibu }}</span>
          <span class="col-sm-4 col-lg-2"><span class="font-weight-bold">ABV:</span> {{ beer!.abv }}</span>
          <span class="col-sm-4 col-lg-2"><span class="font-weight-bold">EBC:</span> {{ beer!.ebc }}</span>
        </div>
        <p>{{ beer!.description }}</p>
        <ng-container *ngIf="beer && beer.food_pairing && beer.food_pairing.length > 0">
          <p class="font-weight-bold">Best served with:</p>
          <ul>
            <li *ngFor="let food of beer.food_pairing">{{ food }}</li>
          </ul>
        </ng-container>
      </div>
    </div>
  `,
  styles: [`
    .border-primary {
      height: 2rem;
      width: 4rem;
      border-width: 0.2rem !important;
    }
  `]
})
export class BeerDescriptionComponent implements OnInit {
  @Input() beer: Beer | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
