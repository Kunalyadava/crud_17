import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  name = 'John Doe';
  age = 25;
  email = 'john@example.com';
  location = 'New York';

  data = [
    { state: 'California', dist: 'Los Angeles County', city: 'Los Angeles' },
    { state: 'Texas', dist: 'Harris County', city: 'Houston' },
    { state: 'Florida', dist: 'Miami-Dade County', city: 'Miami' },
    { state: 'New York', dist: 'Kings County', city: 'Brooklyn' },
    { state: 'Illinois', dist: 'Cook County', city: 'Chicago' },
    { state: 'Nevada', dist: 'Clark County', city: 'Las Vegas' }
  ];

  expandedRow: number | null = null; // Tracks the expanded row index

  toggleRow(index: number): void {
    // Toggle the row's expanded/collapsed state
    this.expandedRow = this.expandedRow === index ? null : index;
  }
}