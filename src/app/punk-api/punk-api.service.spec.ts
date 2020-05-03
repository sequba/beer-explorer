import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PunkApiService } from './punk-api.service';
import { Beer } from '../dtos/beer.dto';

describe('PunkApiService', () => {
  let service: PunkApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(PunkApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchBeerById', () => {
    it('should call "https://api.punkapi.com/v2/beers/:id"', done => {
      service.fetchBeerById(42).subscribe(result => {
        expect(result).toBeTruthy();
        done();
      });

      const req = httpTestingController.expectOne('https://api.punkapi.com/v2/beers/42');
      req.flush([{ id: 42 }]);
    });

    it('should extract result beer from array', done => {
      service.fetchBeerById(42).subscribe(result => {
        expect(result).toEqual({ id: 42 } as Beer);
        done();
      });

      const req = httpTestingController.expectOne('https://api.punkapi.com/v2/beers/42');
      req.flush([{ id: 42 }]);
    });
  });
});
