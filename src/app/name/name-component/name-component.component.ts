import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-name-component',
  standalone: true,
  imports: [ CommonModule,
    ReactiveFormsModule, // Import ReactiveFormsModule
    MatFormFieldModule,   // Material Form Field
    MatInputModule,       // Material Input
    MatButtonModule,      // Material Button
],
  templateUrl: './name-component.component.html',
  styleUrl: './name-component.component.scss'
})
export class NameComponentComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: ['', [
        Validators.required,
        usernameValidator // Apply the custom username validator
      ]],
      clientName: ['', [
        Validators.required,
        clientNameValidator // Apply the custom client name validator
      ]]
    });
  }

  // Getter for form controls
  get username() {
    return this.userForm.get('username');
  }

  get clientName() {
    return this.userForm.get('clientName');
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Submitted!', this.userForm.value);
    } else {
      console.log('Form is invalid!');
    }
  }
}
function usernameValidator(control: any) {
  const pattern = /^[a-zA-Z0-9._-]+$/; // Instagram-like username pattern
  if (control.value && !pattern.test(control.value)) {
    return { invalidUsername: true }; // Return custom error if invalid
  }
  return null;
}

// Custom validator function for Client Name
// function clientNameValidator(control: any) {
//   const pattern = /^[a-zA-Z]+([a-zA-Z ]*[a-zA-Z]+)*$/; // Allows spaces between words but no consecutive spaces
//   if (control.value && !pattern.test(control.value)) {
//     return { invalidClientName: true }; // Return custom error if invalid
//   }
//   return null;
// }
function clientNameValidator(control: any) {
  // Regex that allows letters and only one space between words
  const pattern = /^[a-zA-Z]+( [a-zA-Z]+)*$/; // No consecutive spaces and only letters with a single space allowed
  if (control.value && !pattern.test(control.value)) {
    return { invalidClientName: true }; // Return custom error if invalid
  }
  return null;
}
