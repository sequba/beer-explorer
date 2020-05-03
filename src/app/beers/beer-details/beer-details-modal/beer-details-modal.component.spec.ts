import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerDetailsModalComponent } from './beer-details-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BeerDetailsService } from '../beer-details-service/beer-details.service';
import { BeerDescriptionComponent } from '../beer-description/beer-description.component';
import { RelatedBeersComponent } from '../related-beers/related-beers.component';
import { LoadingComponent } from 'src/app/utils/loading/loading.component';
import { of, throwError } from 'rxjs';
import { Beer } from 'src/app/dtos/beer.dto';

describe('BeerDetailsModalComponent', () => {
  let component: BeerDetailsModalComponent;
  let fixture: ComponentFixture<BeerDetailsModalComponent>;

  let modalMock: NgbActiveModal;
  let serviceMock: BeerDetailsService;

  beforeEach(() => {
    modalMock = {
      close: jasmine.createSpy('close'),
      dismiss: jasmine.createSpy('dismiss')
    } as NgbActiveModal;

    serviceMock = {
      getBeerById: jasmine.createSpy('getBeerById').and.returnValue(of({ id: 42 })),
      getRelatedBeers: jasmine.createSpy('getRelatedBeers').and.returnValue(of([]))
    } as unknown as BeerDetailsService;
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeerDetailsModalComponent, BeerDescriptionComponent, RelatedBeersComponent, LoadingComponent ],
      providers: [
        { provide: NgbActiveModal, useValue: modalMock },
        { provide: BeerDetailsService, useValue: serviceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on beerId set', () => {
    it('should fetch beer by id', () => {
      component.beerId = 42;
      expect(serviceMock.getBeerById).toHaveBeenCalledWith(42);
    });

    it('beer$ should emit value for the beer-description component', done => {
      component.beer$.subscribe(beer => {
        expect(beer).toEqual({ id: 42 } as Beer);
        done();
      });

      component.beerId = 42;
    });

    it('should dismiss the modal with "not-found" reason when error occurs while fetching data', () => {
      serviceMock.getBeerById = jasmine.createSpy('getBeerById').and.returnValue(throwError(new Error())),
      component.beerId = 42;

      expect(modalMock.dismiss).toHaveBeenCalled();
    });

    it('should fetch the related beers', () => {
      component.beerId = 42;
      expect(serviceMock.getRelatedBeers).toHaveBeenCalledWith({ id: 42 } as Beer);
    });

    it('relatedBeers$ should emit value for the related-beers component', done => {
      component.relatedBeers$.subscribe(beers => {
        expect(beers).toEqual([]);
        done();
      });

      component.beerId = 42;
    });
  });

  describe('on close button click', () => {
    it('should close the modal', () => {
      const closeButton = fixture.nativeElement.querySelector('button.close');
      closeButton.click();
      fixture.detectChanges();

      expect(modalMock.close).toHaveBeenCalled();
    });
  });
});
