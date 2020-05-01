import { Injectable } from '@angular/core';
import { BeersStore } from './beers.store';
import { PunkApiService } from 'src/app/punk-api/punk-api.service';
import { tap, mapTo } from 'rxjs/operators';
import { BeersQuery } from './beers.query';

@Injectable({ providedIn: 'root' })
export class BeersService {
  readonly perPage = 20;

  constructor(private store: BeersStore,
              private query: BeersQuery,
              private api: PunkApiService) {}

  loadMore(): Promise<void> {
    if (this.query.getValue().outOfBeers) {
      return Promise.resolve();
    }

    this.store.setLoading(true);
    const fetchingPage = this.query.getValue().lastLoadedPage + 1;
    return this.api.fetchBeers(fetchingPage, this.perPage).pipe(
      tap(beers => this.store.add(beers)),
      tap(beers => this.store.update({ outOfBeers: beers.length <= 0 })),
      tap(() => this.updateLastLoadedPage(fetchingPage)),
      mapTo(undefined),
      tap(() => this.store.setLoading(false))
    ).toPromise();
  }

  private updateLastLoadedPage(value: number): void {
    const oldValue = this.query.getValue().lastLoadedPage;
    const newValue = Math.max(oldValue, value);
    this.store.update({ lastLoadedPage: newValue });
  }
}
