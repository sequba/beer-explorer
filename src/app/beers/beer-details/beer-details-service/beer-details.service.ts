import { Injectable } from '@angular/core';
import { PunkApiService } from 'src/app/punk-api/punk-api.service';
import { Beer } from 'src/app/dtos/beer.dto';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeerDetailsService {

  constructor(private apiService: PunkApiService) { }

  getBeerById(id: number): Observable<Beer> {
    return this.apiService.fetchBeerById(id);
  }

  getRelatedBeers(beer: Beer): Observable<Beer[]> {
    return of([beer, beer, beer]);
  }
}
