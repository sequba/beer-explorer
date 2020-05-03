import { TestBed } from '@angular/core/testing';
import { BeerDetailsService } from './beer-details.service';
import { Beer } from 'src/app/dtos/beer.dto';
import { PunkApiService } from 'src/app/punk-api/punk-api.service';
import { of } from 'rxjs';
import { PunkFilters } from 'src/app/punk-api/punk-filters';

describe('BeerDetailsService', () => {
  let apiServiceMock: any;
  let service: BeerDetailsService;

  const relatedBeersMock = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 }
  ] as Beer[];

  beforeEach(() => {
    apiServiceMock = { fetchBeers: jasmine.createSpy('fetchBeers').and.returnValue(of(relatedBeersMock)) };
  });

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [{ provide: PunkApiService, useValue: apiServiceMock }]});
    service = TestBed.inject(BeerDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRelatedBeers()', () => {
    it('should pass the filter object to the api service', done => {
      const beer = { id: 2, ibu: 100, abv: 200, ebc: 300 } as Beer;

      const expectedFilters: PunkFilters = {
        ibu_gt: 100 - 5, ibu_lt: 100 + 5,
        abv_gt: 200 - 2, abv_lt: 200 + 2,
        ebc_gt: 300 - 18, ebc_lt: 300 + 18,
      };

      service.getRelatedBeers(beer).subscribe(beers => {
        expect(apiServiceMock.fetchBeers).toHaveBeenCalledWith(1, 4, expectedFilters);
        done();
      });
    });

    it('should not put negative numbers in the filter object', done => {
      const beer = { id: 2, ibu: 1, abv: 1, ebc: 1 } as Beer;

      const expectedFilters: PunkFilters = {
        ibu_gt: 0, ibu_lt: 1 + 5,
        abv_gt: 0, abv_lt: 1 + 2,
        ebc_gt: 0, ebc_lt: 1 + 18,
      };

      service.getRelatedBeers(beer).subscribe(beers => {
        expect(apiServiceMock.fetchBeers).toHaveBeenCalledWith(1, 4, expectedFilters);
        done();
      });
    });

    it('should return at most 3 beers', done => {
      const beer = { id: 42, ibu: 1, abv: 1, ebc: 1 } as Beer;

      service.getRelatedBeers(beer).subscribe(beers => {
        expect(beers.length).toEqual(3);
        done();
      });
    });

    it('should not include the input beer in the result', done => {
      const beer = { id: 2, ibu: 1, abv: 1, ebc: 1 } as Beer;

      service.getRelatedBeers(beer).subscribe(beers => {
        expect(beers.length).toEqual(3);
        expect(beers[0].id).not.toEqual(2);
        expect(beers[1].id).not.toEqual(2);
        expect(beers[2].id).not.toEqual(2);
        done();
      });
    });
  });
});
