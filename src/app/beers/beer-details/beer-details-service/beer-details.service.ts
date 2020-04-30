import { Injectable } from '@angular/core';
import { PunkApiService } from 'src/app/punk-api/punk-api.service';
import { Beer } from 'src/app/dtos/beer.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeerDetailsService {

  constructor(private apiService: PunkApiService) { }

  getBeerById(id: number): Observable<Beer> {
    return this.apiService.fetchBeerById(id);
  }
}
