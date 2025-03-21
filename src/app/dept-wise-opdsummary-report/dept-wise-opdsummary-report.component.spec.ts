import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptWiseOPDSummaryReportComponent } from './dept-wise-opdsummary-report.component';

describe('DeptWiseOPDSummaryReportComponent', () => {
  let component: DeptWiseOPDSummaryReportComponent;
  let fixture: ComponentFixture<DeptWiseOPDSummaryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeptWiseOPDSummaryReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeptWiseOPDSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
