import { Injectable } from '@angular/core';
import { BeersStore } from './beers.store';
import { PunkApiService } from 'src/app/punk-api/punk-api.service';
import { tap, mapTo } from 'rxjs/operators';
import { BeersQuery } from './beers.query';
import { transaction } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class BeersService {
  readonly perPage = 20;

  constructor(private store: BeersStore,
              private query: BeersQuery,
              private api: PunkApiService) {}

  loadMore(): Promise<undefined> {
    this.store.setLoading(true);
    const fetchingPage = this.query.getValue().lastLoadedPage + 1;
    return this.api.fetchBeers(fetchingPage, this.perPage).pipe(
      tap(beers => this.store.add(beers)),
      tap(() => this.updateLastLoadedPage(fetchingPage)),
      mapTo(undefined),
      tap(() => this.store.setLoading(false))
    ).toPromise();
  }

  @transaction()
  private updateLastLoadedPage(value: number): void {
    const oldValue = this.query.getValue().lastLoadedPage;
    const newValue = Math.max(oldValue, value);
    this.store.update({lastLoadedPage: newValue});
  }
}
