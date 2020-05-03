import { TestBed } from '@angular/core/testing';
import { Beer } from 'src/app/dtos/beer.dto';
import { PunkApiService } from 'src/app/punk-api/punk-api.service';
import { of } from 'rxjs';
import { BeersService } from './beers.service';
import { BeersQuery } from './beers.query';

describe('BeersStore', () => {
  let apiServiceMock: any;
  let query: BeersQuery;
  let service: BeersService;

  const beersMock = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
    { id: 13 },
    { id: 14 },
    { id: 15 },
    { id: 16 },
    { id: 17 },
    { id: 18 },
    { id: 19 }
  ] as Beer[];

  beforeEach(() => {
    apiServiceMock = { fetchBeers: jasmine.createSpy('fetchBeers').and.returnValue(of(beersMock)) };
  });

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [{ provide: PunkApiService, useValue: apiServiceMock }]});
    query = TestBed.inject(BeersQuery);
    service = TestBed.inject(BeersService);
  });

  describe('BeersQuery', () => {
    it('should be created', () => {
      expect(query).toBeTruthy();
    });
  });

  describe('BeersService', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    describe('loadMore()', () => {
      it('should call api.fetchBeers', async () => {
        await service.loadMore();
        expect(apiServiceMock.fetchBeers).toHaveBeenCalled();
      });

      it('should fetch the pages one by one', async () => {
        await service.loadMore();
        await service.loadMore();
        await service.loadMore();

        const fetchBeersCalls = (apiServiceMock.fetchBeers as jasmine.Spy).calls.allArgs();
        expect(fetchBeersCalls).toEqual([[1, 20], [2, 20], [3, 20]]);
      });

      it('should add beers to the store', async () => {
        const beerCounter = jasmine.createSpy('spy');
        query.allBeers$.subscribe(beers => {
            beerCounter(beers.length);
        });

        await service.loadMore();
        expect(beerCounter.calls.allArgs()).toEqual([[0], [20]]);
      });

      it('should not add duplicates to the store', async () => {
        const beerCounter = jasmine.createSpy('spy');
        query.allBeers$.subscribe(beers => {
            beerCounter(beers.length);
        });

        const p1 = service.loadMore();
        const p2 = service.loadMore();
        const p3 = service.loadMore();
        await Promise.all([p1, p2, p3]);

        expect(beerCounter.calls.mostRecent().args).toEqual([20]);
      });

      it('should indicate the loading state by the "loading" flag', async () => {
        const loadingWatcher = jasmine.createSpy('spy');
        query.selectLoading().subscribe(loading => {
          loadingWatcher(loading);
        });

        await service.loadMore();
        expect(loadingWatcher.calls.allArgs()).toEqual([[true], [false]]);
      });

      it('should not call api when there is no more beers', async () => {
        await service.loadMore();
        expect(apiServiceMock.fetchBeers).toHaveBeenCalled();

        apiServiceMock.fetchBeers = jasmine.createSpy('fetchBeers').and.returnValue(of([]));
        apiServiceMock.fetchBeers.calls.reset();
        await service.loadMore();
        expect(apiServiceMock.fetchBeers).toHaveBeenCalled();

        apiServiceMock.fetchBeers.calls.reset();
        await service.loadMore();
        expect(apiServiceMock.fetchBeers).not.toHaveBeenCalled();
      });
    });
  });
});
