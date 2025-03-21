import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import  moment from 'moment'; // Import Moment.js

interface FinancialYear {
  financialYearId: number;
  financialYear: string;
  fromDate: string;
  toDate: string;
}

@Component({
  selector: 'app-monthsearch',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, CommonModule, MatInputModule, MatButtonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './monthsearch.component.html',
  styleUrls: ['./monthsearch.component.scss']
})
export class MonthsearchComponent {
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

  months = [
    { name: 'All', value: '13' },
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

  currentDate = moment(); // Use Moment.js for current date
  currentMonth = this.currentDate.month() + 1; // Get current month (1-based)
  currentYear = this.currentDate.year(); // Get current year
  currentFinancialYear!: FinancialYear;

  searchOPDForm: FormGroup;
  disabledMonths: Set<string> = new Set();

  constructor(private fb: FormBuilder) {
    this.searchOPDForm = this.fb.group({
      financialYearId: ["", Validators.required],
      month: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Determine the current date and current month
    const currentMonth = moment().month() + 1; // Get current month (1-based)
    const currentYear = moment().year();

    // Determine the financial year ID based on the current month
    let financialYearId: number;
    if (currentMonth >= 4) {
      financialYearId = currentYear - 2021;  // For months from April to December (e.g., 2024-2025)
    } else {
      financialYearId = currentYear - 2022;  // For months from January to March (e.g., 2023-2024)
    }

    // Set the default financial year
    this.searchOPDForm.controls['financialYearId'].setValue(financialYearId);

    // Set the default selected month to the current month
    this.searchOPDForm.controls['month'].setValue(currentMonth.toString().padStart(2, '0')); // Ensure it's two digits (e.g., "01" for January)

    // Call function to disable future months for the current financial year
    this.disableFutureMonthsForFinancialYear(financialYearId);
  }

  // Method to disable future months for a selected financial year
  disableFutureMonthsForFinancialYear(financialYearId: number): void {
    const currentDate = moment();
    const currentYear = currentDate.year();
    const currentMonth = currentDate.month() + 1; // Get current month (1-based)

    // Get the start year for the selected financial year
    const financialYearStartYear = parseInt(this.getFinancialYearStartDate(financialYearId));
    const financialYearEndYear = financialYearStartYear + 1;

    // Reset disabled months
    this.disabledMonths.clear();

    // Disable future months for the current financial year
    this.months.forEach(month => {
      const monthValue = parseInt(month.value); // Convert month to number

      // Determine the year for the current month in the financial year
      let monthYear = financialYearStartYear; // Default year is the start year of the financial year
      if (monthValue === 1 || monthValue === 2 || monthValue === 3) {
        monthYear = financialYearEndYear; // Jan, Feb, Mar belong to the next year
      }

      // Disable future months: If the month is greater than the current month in the current year
      if (monthYear === currentYear && monthValue > currentMonth) {
        this.disabledMonths.add(month.value);
      }
    });

    console.log("Disabled Months:", Array.from(this.disabledMonths));
  }

  // Helper method to extract the start year from the financial year ID
  getFinancialYearStartDate(financialYearId: number): string {
    const selectedFinancialYear = this.financialYears.find(
      (year) => year.financialYearId === financialYearId
    );
    return selectedFinancialYear ? selectedFinancialYear.fromDate : '';
  }

  // Method that runs on selection change for financial year
  onSelectionChange(event: any) {
    const selectedFinancialYearId = event.value;

    // Find the selected financial year
    this.currentFinancialYear = this.financialYears.find(
      (year) => year.financialYearId === selectedFinancialYearId
    )!;

    // Call method to disable future months based on the selected financial year
    this.disableFutureMonthsForFinancialYear(selectedFinancialYearId);
  }

  search() {
    // Implement your search logic here
  }
}
