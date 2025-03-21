import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

interface FinancialYear {
  financialYearId: number;
  financialYear: string;
  fromDate: string;
  toDate: string;
}

interface Month {
  name: string;
  value: string;
}

@Component({
  selector: 'app-selectwholeyear',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './selectwholeyear.component.html',
  styleUrls: ['./selectwholeyear.component.scss']
})
export class SelectwholeyearComponent implements OnInit {
  financialYears: FinancialYear[] = [
    { financialYearId: 2, financialYear: '2023-24', fromDate: '2023-04-01', toDate: '2024-03-31' },
    { financialYearId: 3, financialYear: '2024-25', fromDate: '2024-04-01', toDate: '2025-03-31' }
  ];
  searchOPDForm!: FormGroup;
  months = [
    { id: 1, name: 'April' },
    { id: 2, name: 'May' },
    { id: 3, name: 'June' },
    { id: 4, name: 'July' },
    { id: 5, name: 'August' },
    { id: 6, name: 'September' },
    { id: 7, name: 'October' },
    { id: 8, name: 'November' },
    { id: 9, name: 'December' },
    { id: 10, name: 'January' },
    { id: 11, name: 'February' },
    { id: 12, name: 'March' }
  ];


  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.searchOPDForm = this.fb.group({
      financialYearId: [null, Validators.required],
      months: this.fb.array([], Validators.required), // FormArray for storing selected month IDs
    });
  }

  onSelectionChange(event: any) {
    console.log('Selected Financial Year:', event.value);
  }

  get monthsFormArray() {
    return this.searchOPDForm.get('months') as FormArray;
  }

  toggleSelectAll(event: any) {
    if (event.checked) {
      this.months.forEach(month => {
        this.addMonthToSelection(month.id);
      });
    } else {
      this.monthsFormArray.clear();
    }
    this.logSelectedMonths();
  }

  toggleMonthSelection(monthId: number, event: any) {
    if (event.checked) {
      this.addMonthToSelection(monthId);
    } else {
      this.removeMonthFromSelection(monthId);
    }
    this.logSelectedMonths();
  }

  addMonthToSelection(monthId: number) {
    if (!this.monthsFormArray.controls.some(control => control.value === monthId)) {
      this.monthsFormArray.push(this.fb.control(monthId));
    }
  }

  removeMonthFromSelection(monthId: number) {
    const index = this.monthsFormArray.controls.findIndex(control => control.value === monthId);
    if (index !== -1) {
      this.monthsFormArray.removeAt(index);
    }
  }

  logSelectedMonths() {
    console.log('Selected Month IDs:', this.monthsFormArray.value);
  }

  isMonthSelected(monthId: number): boolean {
    return this.monthsFormArray.controls.some(control => control.value === monthId);
  }

  search() {
    console.log('Search triggered with the following values:');
    console.log(this.searchOPDForm.value);
  }
}