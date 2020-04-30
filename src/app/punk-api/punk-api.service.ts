import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Beer } from '../dtos/beer.dto';
import { map } from 'rxjs/operators';
import { PunkFilters } from './punk-filters';

@Injectable({
  providedIn: 'root'
})
export class PunkApiService {
  readonly rootUrl = 'https://api.punkapi.com/v2/beers';

  constructor(private http: HttpClient) { }

  fetchBeers(pageNo: number, perPage: number, filters: PunkFilters = {}): Observable<Beer[]> {
    const url = `${this.rootUrl}`;
    const params = {...filters, page: pageNo, per_page: perPage} as unknown as {[key: string]: string};
    return this.http.get<Beer[]>(url, {params});
  }

  fetchBeerById(id: number): Observable<Beer> {
    const url = `${this.rootUrl}/${id}`;
    return this.http.get<Beer[]>(url).pipe(map(res => res[0]));
  }
}
