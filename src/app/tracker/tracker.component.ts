import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { APIService } from '../api.service';

export interface CashTracker {
  cashierAccountingCashRcvTrackerID: number;
  levels: number;
  heading: string;
  transactionDate: string;
  parentLevels?: number;
  parentLink?: string;
  parentDate?: string;
  billManager?: string;
  counterType?: string;
  counterName?: string;
  userSession?: string;
  users?: string;
  userSessionStatus?: string;
  sysCashClosingBalance: string;
  cashRcvAmt: string;
  varience: string;
  status?: string;
  Remarks?: string;
  userCollectionId?: number | null;
  cashierAccountingCashReceiveId: number;
  expanded: boolean;
}

@Component({
  selector: 'app-tracker',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    CommonModule,
    MatIconModule,
    MatTabsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss'],
})
export class TrackerComponent implements OnInit, OnDestroy {
  selectedTabIndex: number = 2;
  financialYears = [
    { id: 1, year: '2022-23' },
    { id: 2, year: '2023-24' },
    { id: 3, year: '2024-25' },
    { id: 4, year: '2025-26' },
    { id: 5, year: '2026-27' },
  ];
  defaultDate: string = '2024-12-27T12:47:36.873Z';
  groupedData: { [key: string]: CashTracker[] } = {};
  dataSource: CashTracker[] = [];
  trackerForm!: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(private http: APIService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.search();
  }

  private initializeForm() {
    this.trackerForm = this.fb.group({
      financialYear: [this.financialYears[2], Validators.required],
      fromDate: [new Date(this.defaultDate)],
      toDate: [new Date(this.defaultDate)],
    });
  }

  private formatDateToISO(date: Date): string {
    return date.toISOString();
  }

  search() {
    if (this.trackerForm.invalid) {
      return;
    }

    const { financialYear, fromDate, toDate } = this.trackerForm.value;
    const fromDateFormatted = this.formatDateToISO(fromDate);
    const toDateFormatted = this.formatDateToISO(toDate);

    const payload = {
      financialYearId: this.getFinancialYearId(financialYear),
      fromDate: fromDateFormatted || this.defaultDate,
      toDate: toDateFormatted || this.defaultDate,
      btn_name: 'TRACKER',
      businessAreaId: '1',
    };

    this.http.fetchTrackerData(payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response: CashTracker[]) => {
        console.log('Data fetched:', response);
        this.dataSource = response;
      },
      error: (error: any) => {
        console.error('Error fetching data:', error);
      },
      complete: () => {
        console.log('Data fetch completed');
      },
    });
  }

  private getFinancialYearId(financialYear: any): number {
    return financialYear.id;
  }


  getChildRows(parentId: number): CashTracker[] {
    return this.dataSource.filter(item => item.parentLevels === parentId);
  }
  

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
 
toggleRowExpansion(element: CashTracker) {
  element.expanded = !element.expanded;
  this.collapseSiblings(element);
}

collapseSiblings(expandedRow: CashTracker) {
  this.dataSource.forEach(row => {
    if (row !== expandedRow) {
      if (this.shouldCollapse(row, expandedRow)) {
        row.expanded = false;
      }
    }
  });
}

shouldCollapse(row: CashTracker, expandedRow: CashTracker): boolean {
  if (expandedRow.levels === 1 && row.parentLink !== expandedRow.transactionDate) {
    return true;
  }
  if (expandedRow.levels === 2 && row.parentLink !== expandedRow.billManager) {
    return true;
  }
  if (expandedRow.levels === 3 && row.parentLink !== expandedRow.counterType) {
    return true;
  }
  if (expandedRow.levels === 4 && row.parentLink !== expandedRow.counterName) {
    return true;
  }
  return false;
}

  
}
