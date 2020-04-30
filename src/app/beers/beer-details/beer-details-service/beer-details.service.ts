import { Injectable } from '@angular/core';
import { PunkApiService } from 'src/app/punk-api/punk-api.service';
import { Beer } from 'src/app/dtos/beer.dto';
import { Observable, of } from 'rxjs';
import { PunkFilters } from 'src/app/punk-api/punk-filters';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BeerDetailsService {
  readonly ibuDelta = 5;
  readonly abvDelta = 2;
  readonly ebcDelta = 18;

  constructor(private apiService: PunkApiService) { }

  getBeerById(id: number): Observable<Beer> {
    return this.apiService.fetchBeerById(id);
  }

  getRelatedBeers(beer: Beer): Observable<Beer[]> {
    const filters: PunkFilters = {
      ibu_gt: Math.max(beer.ibu - this.ibuDelta, 0), ibu_lt: beer.ibu + this.ibuDelta,
      abv_gt: Math.max(beer.abv - this.abvDelta, 0), abv_lt: beer.abv + this.abvDelta,
      ebc_gt: Math.max(beer.ebc - this.ebcDelta, 0), ebc_lt: beer.ebc + this.ebcDelta
    };
    return this.apiService.fetchBeers(1, 4, filters).pipe(
      map(related => related.filter(b => b.id !== beer.id)),
      map(beers => beers.slice(0, 3))
    );
  }
}
