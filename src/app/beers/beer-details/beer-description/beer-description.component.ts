import { Component, OnInit, Input } from '@angular/core';
import { Beer } from 'src/app/dtos/beer.dto';

@Component({
  selector: 'bex-beer-description',
  template: `
    <div class="row">
      <div class="col-2 col-sm-3 col-lg-2">
        <img class="img-fluid" src="{{ beer!.image_url }}" alt="Photo of the beer">
      </div>
      <div class="col-10 col-sm-9 col-lg-10">
        <h5 class="modal-title">{{ beer!.name }}</h5>
        <p>{{ beer!.description }}</p>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class BeerDescriptionComponent implements OnInit {
  @Input() beer: Beer | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
