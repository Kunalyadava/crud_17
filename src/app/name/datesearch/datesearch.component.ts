import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import moment from 'moment';

import Swal from 'sweetalert2';
interface FinancialYear {
  financialYearId: number;
  financialYear: string;
  fromDate: string;
  toDate: string;
}

@Component({
  selector: 'app-datesearch',
  standalone: true,
  imports: [MatFormFieldModule,FormsModule,
    MatSelectModule,ReactiveFormsModule,CommonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule ],
  templateUrl: './datesearch.component.html',
  styleUrl: './datesearch.component.scss'
})
export class DatesearchComponent {
financialYears: FinancialYear[] = [
    {
      financialYearId: 2,
      financialYear: "2023-24",
      fromDate: "2023-04-01",
      toDate: "2024-03-31",
    },
    {
      financialYearId: 3,
      financialYear: "2024-25",
      fromDate: "2024-04-01",
      toDate: "2025-03-31",
    },
  ];
  

  
  @Output() searchData = new EventEmitter<any>();
  searchOPDForm: FormGroup;
  minStartDate!: string; 
  minEndDate!: string; 
  loading = false;
  maxStartDate!: string;
  maxEndDate!: string;

  
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
  disabledMonths: Set<string> = new Set();

  constructor(private fb: FormBuilder ) {

    this.searchOPDForm = this.fb.group({
      financialYearId: ["", Validators.required],
      month: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  // ngOnInit(): void {
  //   this.getFinancialYears()
    
  //   this.Search();
  // }

  ngOnInit(): void {
    // Get financial years data (if any)
    
    // Determine the current date and current month
    const currentMonth = moment().month() + 1; // Get current month (1-based)
    const currentYear = moment().year();
    
    // Determine the financial year ID based on the current month
    let financialYearId: number;
    if (currentMonth >= 4) {
      financialYearId = currentYear - 2021;  // For months from April to December (2024-2025)
    } else {
      financialYearId = currentYear - 2022;  // For months from January to March (2023-2024)
    }
    
    // Set the default financial year
    this.searchOPDForm.controls['financialYearId'].setValue(financialYearId);
  
    // Dynamically set the start and end date for the previous month
    const previousMonth = (currentMonth === 1) ? 12 : currentMonth - 1;
    const selectedMonth = previousMonth.toString().padStart(2, '0'); // Ensure it's two digits (e.g., "01" for January)
    
    // Set the default selected month
    this.searchOPDForm.controls['month'].setValue(selectedMonth);
    
    // Dynamically set the start and end dates for the previous month
    const startDate = moment().month(previousMonth - 1).startOf('month').format('YYYY-MM-DD');
    const endDate = moment().month(previousMonth - 1).endOf('month').format('YYYY-MM-DD');
    
    // Set the default start and end dates in the form
    this.searchOPDForm.controls['startDate'].setValue(startDate);
    this.searchOPDForm.controls['endDate'].setValue(endDate);
  
    // Call function to disable future months for the current financial year
    this.disableFutureMonthsForFinancialYear(financialYearId);
  }
  
  // Disable months that are in the future for the selected financial year
  disableFutureMonthsForFinancialYear(financialYearId: number): void {
    const currentYear = moment().year();
    const currentMonth = moment().month() + 1; // Get current month (1-based)
    
    // Get the start year for the selected financial year
    const financialYearStartYear = parseInt(this.getFinancialYearStartDate(financialYearId));
    const financialYearEndYear = financialYearStartYear + 1;
    
    // Reset disabled months
    this.disabledMonths.clear();
    
    // Disable future months for the current financial year
    this.months.forEach(month => {
      const monthValue = parseInt(month.value); // Convert month to number
      
      // Determine the year for the current month
      let monthYear = financialYearStartYear; // Default year is the start year of the financial year
      if (monthValue === 1 || monthValue === 2 || monthValue === 3) {
        monthYear = financialYearEndYear; // Jan, Feb, Mar belong to the next year
      }
      
      // Disable future months (months greater than current month in the current year)
      if (monthYear === currentYear && monthValue > currentMonth) {
        this.disabledMonths.add(month.value);
      }
    });
  
    console.log("Disabled Months:", Array.from(this.disabledMonths));
  }
  
  Search(): void {
    const fromDate = this.searchOPDForm.controls['startDate'].value;
    const toDate = this.searchOPDForm.controls['endDate'].value;

    const start = moment(fromDate);
    const end = moment(toDate);

    //  Check if start date is after end date
    if (start.isAfter(end)) {
        Swal.fire({
            text: "Start date cannot be after end date",
            icon: "error",
            confirmButtonColor: "#f44336",
            confirmButtonText: "Ok",
        });
        return;
    }

    //  Ensure the date range does not exceed 30 days
    const diffInDays = end.diff(start, 'days');
    if (diffInDays > 30) {
        Swal.fire({
            text: "Maximum One Month Data Can be Filtered",
            icon: "error",
            confirmButtonColor: "#f44336",
            confirmButtonText: "Ok",
        });
        return;
    }

    this.loading = true;
    const requestData = {
        financialYearId: this.searchOPDForm.controls['financialYearId'].value,
        startDate: fromDate,
        endDate: toDate,
    };

    console.log("✅ Emitting search data:", requestData);
    this.searchData.emit(requestData);
}

  onMonthChange(event: any): void {
    const selectedMonth = event.value;
    const financialYearId = this.searchOPDForm.controls['financialYearId'].value;
  
    // Get the start year for the selected financial year
    const financialYearStartYear = parseInt(this.getFinancialYearStartDate(financialYearId));
    const financialYearEndYear = financialYearStartYear + 1;
  
    // Determine the correct year for the selected month
    let selectedYear = financialYearStartYear;
    if (selectedMonth === '01' || selectedMonth === '02' || selectedMonth === '03') {
      selectedYear = financialYearEndYear; // Jan, Feb, Mar belong to the next year
    }
  
    // Construct the start date as the 1st of the selected month
    const startDate = moment(`${selectedYear}-${selectedMonth}-01`);
  
    // Get today's date
    const today = moment();
  
    let endDate;
    if (today.year() === selectedYear && today.format('MM') === selectedMonth) {
      endDate = today; // If it's the current month, max end date is today
    } else {
      endDate = startDate.clone().endOf('month'); // Else, last day of the selected month
    }
  
    // Set the selected date range
    this.searchOPDForm.controls['startDate'].setValue(startDate.format('YYYY-MM-DD'));
    this.searchOPDForm.controls['endDate'].setValue(endDate.format('YYYY-MM-DD'));
  
    console.log(`Updated Date Range: ${startDate.format('YYYY-MM-DD')} to ${endDate.format('YYYY-MM-DD')}`);
  }
  
  onSelectionChange(event: any): void {
    const financialYearId = event.value;
    const currentYear = moment().year();
    const currentMonth = parseInt(moment().format('MM')); // Get current month as a number
  
    console.log("Selected Financial Year ID:", financialYearId);
  
    const financialYearStartYear = parseInt(this.getFinancialYearStartDate(financialYearId));
    const financialYearEndYear = financialYearStartYear + 1;
  
    // Reset disabled months
    this.disabledMonths.clear();
  
    this.months.forEach(month => {
      const monthValue = parseInt(month.value); // Convert month to number
  
      // Determine if this month belongs to the first or second year of the financial year
      let monthYear = financialYearStartYear; // Default year is the start year of the financial year
      if (monthValue === 1 || monthValue === 2 || monthValue === 3) {
        monthYear = financialYearEndYear; // Jan, Feb, Mar belong to the next year
      }
  
      // Disable future months
      if (monthYear === currentYear && monthValue > currentMonth) {
        this.disabledMonths.add(month.value);
      }
    });
  
    console.log("Disabled Months:", Array.from(this.disabledMonths));
  
    // Reset the selected month
    this.searchOPDForm.controls['month'].setValue('');
    this.resetDateRange(financialYearId);
  }
  

  resetDateRange(financialYearId: number): void {
    const startYear = this.getFinancialYearStartDate(financialYearId);
    const currentDate = moment();
  
    this.minStartDate = `${startYear}-04-01`;
    this.maxStartDate = currentDate.format('YYYY-MM-DD'); // Restrict future dates
  
    this.minEndDate = this.minStartDate;
    this.maxEndDate = this.maxStartDate;
  
    // Reset date values in form
    this.searchOPDForm.controls['startDate'].setValue('');
    this.searchOPDForm.controls['endDate'].setValue('');
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

  getFinancialYearStartDate(financialYearId: number): string {
    // Map financial years to their starting year
    const financialYearMapping: { [key: number]: string } = {
      1: '2022',
      2: '2023',
      3: '2024',
      4: '2025',
      5: '2026',
      6:'2027',
      7:'2028',
    };

    return financialYearMapping[financialYearId];
  }

  // getFinancialYears() {
  //   this.masterservice.trialbalance({ "btn_name": "FINANCIAL_YEAR" }).subscribe({
  //     next: (res) => {
  //       this.financialYears = res;
  //       console.log(" this.financialYears", this.financialYears)
  //     },
  //     error: (err) => {
  //       console.error('Error fetching financial years', err);
  //     },
  //     complete: () => {
  //       console.log('Financial year data fetch complete');
  //     }
  //   });
  // }


}
