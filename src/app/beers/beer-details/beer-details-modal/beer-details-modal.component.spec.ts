import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerDetailsModalComponent } from './beer-details-modal.component';

describe('BeerDetailsModalComponent', () => {
  let component: BeerDetailsModalComponent;
  let fixture: ComponentFixture<BeerDetailsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeerDetailsModalComponent ]
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
});
