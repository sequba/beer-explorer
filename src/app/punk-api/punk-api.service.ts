import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Beer } from '../dtos/beer.dto';

@Injectable({
  providedIn: 'root'
})
export class PunkApiService {
  readonly rootUrl = 'https://api.punkapi.com/v2/beers';

  fetchBeers(pageNo: number, perPage: number): Observable<Beer[]> {
    const url = `${this.rootUrl}?page=${pageNo}&per_page=${perPage}`;
    return this.http.get<Beer[]>(url);
  }

  fetchBeerById(id: number): Observable<Beer> {
    const url = `${this.rootUrl}/${id}`;
    return this.http.get<Beer>(url);
  }

  constructor(private http: HttpClient) { }
}
