import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerDetailsModalContainerComponent } from './beer-details-modal-container.component';

describe('BeerDetailsModalContainerComponent', () => {
  let component: BeerDetailsModalContainerComponent;
  let fixture: ComponentFixture<BeerDetailsModalContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeerDetailsModalContainerComponent ]
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
});
