import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BeerListComponent } from './beer-list.component';
import { Router } from '@angular/router';
import { BeersQuery } from './state/beers.query';
import { BeersService } from './state/beers.service';
import { of } from 'rxjs';

describe('BeerListComponent', () => {
  let component: BeerListComponent;
  let fixture: ComponentFixture<BeerListComponent>;

  let routerMock: Router;
  let beersQueryMock: BeersQuery;
  let beersServiceMock: BeersService;

  beforeEach(() => {
    routerMock = {} as Router;

    beersQueryMock = {
      allBeers$: of([]),
      outOfBeers$: of(false),
      selectLoading: jasmine.createSpy()
    } as unknown as BeersQuery;

    beersServiceMock = {
      loadMore: jasmine.createSpy()
    } as unknown as BeersService;
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeerListComponent ],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: BeersQuery, useValue: beersQueryMock },
        { provide: BeersService, useValue: beersServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
