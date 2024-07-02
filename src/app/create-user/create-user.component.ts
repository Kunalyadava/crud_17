import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { APIService } from '../api.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule,MatDialogModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  userForm: FormGroup
  constructor(private fb: FormBuilder, private http: APIService, @Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<CreateUserComponent>) {
    this.userForm = this.fb.group({
      personalInfo: this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
        mobile: ['', [Validators.required]],
        dob: ['', [Validators.required]]
      }),
      gender: ['', [Validators.required]],
      skills: this.fb.array([]),
      address: this.fb.array([])
    })
    this.userForm.patchValue(this.data)

  }
  get skills(): FormArray {
    return this.userForm.get('skills') as FormArray;
  }
  // addSkill(): void {
  //   this.skills.push(this.fb.group({skillName: ['', Validators.required] }));
  // }
  addSkills(): void {
    this.skills.push(this.fb.control('', Validators.required));
  }
  deleteSkill(index: number): void {
    this.skills.removeAt(index);
  }
  get address(): FormArray {
    return this.userForm.get("address") as FormArray
  }
  addAddress(): void {
    this.address.push(this.fb.group({
      state: ["", [Validators.required]],
      district: ['', [Validators.required]],
      location: ["", [Validators.required]]
    }))
  }
  deleteAddress(i: number) {
    this.address.removeAt(i)
  }
  Submit() {
    if (!this.data) {
      console.log(this.userForm.value)
      this.http.createUser(this.userForm.value).subscribe({
        next: ((res: any) => {
          console.log("response", res)
          this.dialogRef.close(true)
        })
      })
    } else {
      this.http.updateUser(this.userForm.value,this.data.id).subscribe((res: any) => {
        console.log("updateUserdata", res)
        this.dialogRef.close(true)
      })
    }
  }
}