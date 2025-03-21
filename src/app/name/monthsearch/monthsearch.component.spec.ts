import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthsearchComponent } from './monthsearch.component';

describe('MonthsearchComponent', () => {
  let component: MonthsearchComponent;
  let fixture: ComponentFixture<MonthsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthsearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonthsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
