import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedBeersComponent } from './related-beers.component';

describe('RelatedBeersComponent', () => {
  let component: RelatedBeersComponent;
  let fixture: ComponentFixture<RelatedBeersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedBeersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedBeersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
