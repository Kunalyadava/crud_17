import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
export interface OpdReport {
  deptwiseOpdreportID: number;
  level: number;
  heading: string;
  fromDate: string;
  toDate: string;
  parentlevel: number;
  parentlink: string | null;
  period_nos: number;
  period_name: string;
  deptName: string | null;
  deptId: number;
  ticketnos: number;
  srn: number;
  otherpatientType: string | null;
  isExpand: boolean; // <-- Add this property
}

@Component({
  selector: 'app-dept-wise-opdsummary-report',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
     MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    // Other modules
  ],
  templateUrl: './dept-wise-opdsummary-report.component.html',
  styleUrl: './dept-wise-opdsummary-report.component.scss',
    providers: [provideNativeDateAdapter()],
})
export class DeptWiseOPDSummaryReportComponent implements OnInit {
  searchOPDForm: FormGroup;
  minStartDate!: string; // Minimum start date for the From Date picker
  minEndDate!: string; // Minimum end date for the To Date picker

  // New properties for max dates
  maxStartDate!: string;
  maxEndDate!: string;
  totaldata = [
    {
      deptwiseOpdreportID: 1,
      level: 1,
      heading: "Y",
      fromDate: "2024-04-01",
      toDate: "2024-04-30",
      parentlevel: 0,
      parentlink: null,
      period_nos: 1,
      period_name: "April",
      deptName: null,
      deptId: 0,
      ticketnos: 155,
      srn: 0,
      otherpatientType: null,
      isExpand: false 
    },
    {
      deptwiseOpdreportID: 2,
      level: 2,
      heading: "N",
      fromDate: "2024-04-01",
      toDate: "2024-04-30",
      parentlevel: 1,
      parentlink: "April",
      period_nos: 0,
      period_name: null,
      deptName: "Cardiology",
      deptId: 11,
      ticketnos: 103,
      srn: 1,
      otherpatientType: "N",
      isExpand: false 
    },
    {
      deptwiseOpdreportID: 3,
      level: 2,
      heading: "N",
      fromDate: "2024-04-01",
      toDate: "2024-04-30",
      parentlevel: 1,
      parentlink: "April",
      period_nos: 0,
      period_name: null,
      deptName: "Orthopaedic",
      deptId: 10,
      ticketnos: 23,
      srn: 0,
      otherpatientType: "N",
      isExpand: false 
    },
    {
      deptwiseOpdreportID: 4,
      level: 2,
      heading: "N",
      fromDate: "2024-04-01",
      toDate: "2024-04-30",
      parentlevel: 1,
      parentlink: "April",
      period_nos: 0,
      period_name: null,
      deptName: "General Medicine",
      deptId: 8,
      ticketnos: 17,
      srn: 0,
      otherpatientType: "N",
      isExpand: false 
    },
    {
      deptwiseOpdreportID: 5,
      level: 2,
      heading: "N",
      fromDate: "2024-04-01",
      toDate: "2024-04-30",
      parentlevel: 1,
      parentlink: "April",
      period_nos: 0,
      period_name: null,
      deptName: "Anatomy",
      deptId: 30,
      ticketnos: 6,
      srn: 0,
      otherpatientType: "N",
      isExpand: false 
    },
    {
      deptwiseOpdreportID: 6,
      level: 2,
      heading: "N",
      fromDate: "2024-04-01",
      toDate: "2024-04-30",
      parentlevel: 1,
      parentlink: "April",
      period_nos: 0,
      period_name: null,
      deptName: "Dermatology",
      deptId: 13,
      ticketnos: 2,
      srn: 0,
      otherpatientType: "N",
      isExpand: false 
    },
    {
      deptwiseOpdreportID: 7,
      level: 2,
      heading: "N",
      fromDate: "2024-04-01",
      toDate: "2024-04-30",
      parentlevel: 1,
      parentlink: "April",
      period_nos: 0,
      period_name: null,
      deptName: "Respiratory",
      deptId: 17,
      ticketnos: 1,
      srn: 0,
      otherpatientType: "N",
      isExpand: false 
    },
    {
      deptwiseOpdreportID: 8,
      level: 2,
      heading: "N",
      fromDate: "2024-04-01",
      toDate: "2024-04-30",
      parentlevel: 1,
      parentlink: "April",
      period_nos: 0,
      period_name: null,
      deptName: "Dental Department",
      deptId: 43,
      ticketnos: 1,
      srn: 0,
      otherpatientType: "N",
      isExpand: false 
    },
    {
      deptwiseOpdreportID: 9,
      level: 2,
      heading: "N",
      fromDate: "2024-04-01",
      toDate: "2024-04-30",
      parentlevel: 1,
      parentlink: "April",
      period_nos: 0,
      period_name: null,
      deptName: "General Surgery",
      deptId: 20,
      ticketnos: 1,
      srn: 0,
      otherpatientType: "N",
      isExpand: false 
    },
    {
      deptwiseOpdreportID: 10,
      level: 2,
      heading: "N",
      fromDate: "2024-04-01",
      toDate: "2024-04-30",
      parentlevel: 1,
      parentlink: "April",
      period_nos: 0,
      period_name: null,
      deptName: "Neurology",
      deptId: 32,
      ticketnos: 1,
      srn: 0,
      otherpatientType: "N",
      isExpand: false 
    },
  ];
  
  loading = false;
  totalticket = 0;
  totalsrn = 0;
  financialYears = [
    { id: 1, name: '2022-23' },
    { id: 2, name: '2023-24' },
    { id: 3, name: '2024-25' },
  ];
  months = [
    { name: 'April', value: '04' },
    { name: 'May', value: '05' },
    { name: 'June', value: '06' },
    { name: 'July', value: '07' },
    { name: 'August', value: '08' },
    { name: 'September', value: '09' },
    { name: 'October', value: '10' },
    { name: 'November', value: '11' },
    { name: 'December', value: '12' },
    { name: 'January', value: '01' },
    { name: 'February', value: '02' },
    { name: 'March', value: '03' }
  ];
  constructor(private fb: FormBuilder) {

    this.searchOPDForm = this.fb.group({
      financialYearId: [null, Validators.required],
      month: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    
    this.search();
  }

  search(): void {
    this.loading = true;

    const requestData = {
      btn_name: 'DEPTWISE_OPD_SUMMARY_REPORT',
      businessAreaId: 'businessAreaId',
      financialYearId: this.searchOPDForm.controls['financialYearId'].value,
    };

    console.log('Request Data:', requestData);

    // Simulate data fetch
    setTimeout(() => {
      this.calculateTotals();
      this.loading = false;
    }, 1000);
  }
  onMonthChange(event: any): void {
    const selectedMonth = event.value;
    const financialYearId = this.searchOPDForm.controls['financialYearId'].value;
    
    // Get the start year for the selected financial year
    const financialYearStartYear = this.getFinancialYearStartDate(financialYearId);
    
    // Adjust the year based on the selected month
    let selectedYear = financialYearStartYear;
    
    // If the selected month is from January to March, it should fall into the next year (2023 in case of 2022-23)
    if (selectedMonth === '01' || selectedMonth === '02' || selectedMonth === '03') {
      selectedYear = (parseInt(financialYearStartYear) + 1).toString(); // For 2022-23, it'll set the year to 2023
    }
  
    // Set the date range based on the adjusted year and selected month
    this.setDateRange(selectedYear, selectedMonth);
  }
  
  onSelectionChange(event: any): void {
    // Get the new financial year selected
    const financialYearId = event.value;
    const selectedMonth = this.searchOPDForm.controls['month'].value;  // Keep the previously selected month
    
    // Recalculate the min and max dates for the new financial year
    this.setMinMaxDates(financialYearId);
    
    // Recalculate the calendar dates based on the new financial year and selected month
    this.setDateRangeBasedOnFinancialYear(financialYearId, selectedMonth);
  }
  
  setDateRangeBasedOnFinancialYear(financialYearId: number, month: string): void {
    const financialYearStartYear = this.getFinancialYearStartDate(financialYearId);
    
    // Adjust the year based on the selected month
    let selectedYear = financialYearStartYear;
    
    // If the selected month is from January to March, it should fall into the next year
    if (month === '01' || month === '02' || month === '03') {
      selectedYear = (parseInt(financialYearStartYear) + 1).toString();
    }
    
    // Set the date range based on the selected month and the adjusted year
    this.setDateRange(selectedYear, month);
  }
  // setDateRange(year: string, month: string): void {
  //   const startDate = new Date(`${year}-${month}-01`); // Start date is the 1st of the selected month
  //   const endDate = new Date(startDate);
    
  //   // Set the end date to the last day of the month
  //   endDate.setMonth(startDate.getMonth() + 1);
  //   endDate.setDate(0); // This sets the date to the last day of the selected month
    
  //   // Format the dates as 'yyyy-MM-dd' to be used in the form
  //   this.searchOPDForm.controls['startDate'].setValue(startDate.toISOString().split('T')[0]);
  //   this.searchOPDForm.controls['endDate'].setValue(endDate.toISOString().split('T')[0]);
  // }


  setDateRange(year: string, month: string): void {
  // Check if the month is null or undefined
  if (!month || month === 'null' || month === 'undefined') {
    console.error('Invalid month value:', month);
    return; // Exit early if the month is invalid
  }

  // Ensure that month is always a 2-digit value (e.g. '1' becomes '01')
  const paddedMonth = month.padStart(2, '0'); 

  // Log to ensure year and month values are correct
  console.log(`Year: ${year}, Month: ${paddedMonth}`);

  // Check if year and month are valid before creating the Date object
  if (!year || isNaN(parseInt(year)) || isNaN(parseInt(paddedMonth))) {
    console.error('Invalid year or month values!');
    return; // Exit early if year or month is invalid
  }

  // Create a new Date object for the start of the month
  const startDate = new Date(`${year}-${paddedMonth}-01`);

  // Log startDate to debug
  console.log('Start Date:', startDate);

  // Check if startDate is valid
  if (isNaN(startDate.getTime())) {
    console.error('Invalid start date:', startDate);
    return; // Exit if the start date is invalid
  }

  // Create a new Date object for the end of the month (last day)
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 1);
  endDate.setDate(0); // This sets the date to the last day of the selected month

  // Log endDate to debug
  console.log('End Date:', endDate);

  // Check if endDate is valid
  if (isNaN(endDate.getTime())) {
    console.error('Invalid end date:', endDate);
    return; // Exit if the end date is invalid
  }

  // Format dates as 'yyyy-MM-dd' before setting them
  const formattedStartDate = startDate.toISOString().split('T')[0];
  const formattedEndDate = endDate.toISOString().split('T')[0];

  console.log('Formatted Start Date:', formattedStartDate);
  console.log('Formatted End Date:', formattedEndDate);

  // Set the formatted dates in the form controls
  this.searchOPDForm.controls['startDate'].setValue(formattedStartDate);
  this.searchOPDForm.controls['endDate'].setValue(formattedEndDate);
}

  setMinMaxDates(financialYearId: number): void {
    const startYear = this.getFinancialYearStartDate(financialYearId);
    
    // Set the min and max date for startDate and endDate based on the financial year
    this.minStartDate = `${startYear}-04-01`;  // Start from April of the selected year
    this.maxStartDate = `${startYear + 1}-03-31`;  // End at March of the next year
    
    this.minEndDate = this.minStartDate;
    this.maxEndDate = this.maxStartDate;
  }
  

  // onSelectionChange(event: any): void {
  //   this.searchOPDForm.controls['financialYearId'].setValue(event.value);
  //   this.search();
  // }
  getFinancialYearStartDate(financialYearId: number): string {
    // Map financial years to their starting year
    const financialYearMapping: { [key: number]: string } = {
      1: '2022',
      2: '2023',
      3: '2024'
    };
    
    return financialYearMapping[financialYearId];
  }
  

  toggleRow(row: any): void {
    row.isExpand = !row.isExpand;
  }
  

  calculateTotals(): void {
    this.totalticket = this.totaldata
      .filter((row) => row.level === 2)
      .reduce((sum, row) => sum + row.ticketnos, 0);

    this.totalsrn = this.totaldata
      .filter((row) => row.level === 2)
      .reduce((sum, row) => sum + row.srn, 0);
  }
}
