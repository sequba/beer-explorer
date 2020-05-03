import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerDetailsModalContainerComponent } from './beer-details-modal-container.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('BeerDetailsModalContainerComponent', () => {
  let component: BeerDetailsModalContainerComponent;
  let fixture: ComponentFixture<BeerDetailsModalContainerComponent>;

  let routerMock: Router;
  let activatedRouteMock: ActivatedRoute;
  let modalRefMock: NgbModalRef;
  let modalServiceMock: NgbModal;

  beforeEach(() => {
    routerMock = {
      navigate: jasmine.createSpy('navigate').and.returnValue(Promise.resolve())
    } as unknown as Router;

    activatedRouteMock = {
      paramMap: of({ get: () => '42' })
    } as unknown as ActivatedRoute;

    modalRefMock = {
      componentInstance: {},
      result: new Promise(() => {})
    } as NgbModalRef;

    modalServiceMock = {
      open: jasmine.createSpy('open').and.returnValue(modalRefMock)
    } as unknown as NgbModal;
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeerDetailsModalContainerComponent ],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: NgbModal, useValue: modalServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerDetailsModalContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should open the modal when ":id" in url is valid', () => {
      expect(modalServiceMock.open).toHaveBeenCalled();
    });

    it('should pass the valid ":id" to the modal instance', () => {
      expect(modalRefMock.componentInstance.beerId).toEqual(42);
    });

    it('should navigate to "/page-not-found" when ":id" is invalid', () => {
      (activatedRouteMock as any).paramMap = of({ get: () => '8yrh3rfwfe3i65s' });

      fixture = TestBed.createComponent(BeerDetailsModalContainerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(routerMock.navigate).toHaveBeenCalledWith(['/page-not-found']);
    });

    it('should navigate to "/page-not-found" when ":id" is null', () => {
      (activatedRouteMock as any).paramMap = of({ get: () => null });

      fixture = TestBed.createComponent(BeerDetailsModalContainerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(routerMock.navigate).toHaveBeenCalledWith(['/page-not-found']);
    });
  });

  describe('on modal close', () => {
    it('should navigate to home', async () => {
      modalRefMock.result = Promise.resolve();

      fixture = TestBed.createComponent(BeerDetailsModalContainerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      await Promise.resolve();
      expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should navigate to "/details/:id" if the modal had been closed with the beer parameter', async () => {
      modalRefMock.result = Promise.resolve({ id: 123 });

      fixture = TestBed.createComponent(BeerDetailsModalContainerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      await Promise.resolve();
      expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
      await Promise.resolve();
      expect(routerMock.navigate).toHaveBeenCalledWith(['/details', 123]);
    });
  });

  describe('on modal dismiss', () => {
    it('should navigate to home', async () => {
      modalRefMock.result = Promise.reject();

      fixture = TestBed.createComponent(BeerDetailsModalContainerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      await Promise.resolve();
      expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should navigate to "/page-not-found" if the modal had been closed with the "not-found" reason', async () => {
      modalRefMock.result = Promise.reject('not-found');

      fixture = TestBed.createComponent(BeerDetailsModalContainerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      await Promise.resolve();
      expect(routerMock.navigate).toHaveBeenCalledWith(['/page-not-found']);
    });
  });
});
