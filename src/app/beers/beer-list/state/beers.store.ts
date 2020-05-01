import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Beer } from 'src/app/dtos/beer.dto';

export interface BeersState extends EntityState<Beer, number> {
  lastLoadedPage: number;
  outOfBeers: boolean;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'beers', idKey: 'id' })
export class BeersStore extends EntityStore<BeersState> {
  constructor() {
    super({
      lastLoadedPage: 0,
      outOfBeers: false
    });
  }
}

