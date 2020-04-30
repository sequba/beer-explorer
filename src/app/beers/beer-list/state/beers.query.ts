import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { BeersStore, BeersState } from './beers.store';
import { Observable } from 'rxjs';
import { Beer } from 'src/app/dtos/beer.dto';

@Injectable({ providedIn: 'root' })
export class BeersQuery extends QueryEntity<BeersState> {
  constructor(protected store: BeersStore) {
    super(store);
  }

  allBeers$: Observable<Beer[]> = this.selectAll();
}
