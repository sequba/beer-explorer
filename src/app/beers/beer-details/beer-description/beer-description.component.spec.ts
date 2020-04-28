import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerDescriptionComponent } from './beer-description.component';

describe('BeerDescriptionComponent', () => {
  let component: BeerDescriptionComponent;
  let fixture: ComponentFixture<BeerDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeerDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
