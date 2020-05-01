import { Injectable } from '@angular/core';
import { BeersStore } from './beers.store';
import { PunkApiService } from 'src/app/punk-api/punk-api.service';
import { Observable } from 'rxjs';
import { tap, mapTo } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BeersService {
  readonly perPage = 20;
  lastPageNo = 0;

  constructor(private store: BeersStore,
              private api: PunkApiService) {}

  loadMore(): Observable<undefined> {
    this.store.setLoading(true);
    const fetchingPage = this.lastPageNo + 1;
    return this.api.fetchBeers(fetchingPage, this.perPage).pipe(
      tap(beers => this.store.add(beers)),
      tap(() => this.lastPageNo = Math.max(fetchingPage, this.lastPageNo)),
      mapTo(undefined),
      tap(() => this.store.setLoading(false))
    );
  }
}
