import { Injectable } from '@angular/core';
import { BeersStore } from './beers.store';
import { PunkApiService } from 'src/app/punk-api/punk-api.service';
import { Observable } from 'rxjs';
import { tap, mapTo } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BeersService {
  readonly perPage = 20;

  constructor(private store: BeersStore,
              private api: PunkApiService) {}

  loadMore(): Observable<undefined> {
    this.store.setLoading(true);
    return this.api.fetchBeers(1, this.perPage).pipe(
      tap(beers => this.store.add(beers)),
      mapTo(undefined),
      tap(() => this.store.setLoading(false))
    );
  }
}
