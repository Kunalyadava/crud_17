import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { APIService } from '../api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  addUser: FormGroup
  constructor(private fb: FormBuilder, private http: APIService, private location: Location) {
    this.addUser = this.fb.group({
      userInfo: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        name: ['', [Validators.required, Validators.pattern(/^[^./]+$/),
        Validators.minLength(2), Validators.maxLength(15)]]
      }),
      hobbies: this.fb.array([], [Validators.minLength(2)]),
      myAlbum: this.fb.array([], [Validators.minLength(2)])

    })
  }
  get hobbies(): FormArray {
    return this.addUser.get("hobbies") as FormArray
  }
  deleteHobby(i: number) {
    this.hobbies.removeAt(i)
  }
  addHobby() {
    this.hobbies.push(this.fb.group({ hoby: ['', Validators.required] }))
  }

  Submit() {
    console.log("this.addUser", this.addUser)
    // console.log(this.addUser.value)
    if (this.addUser.valid) {
      const userdata = {
        ...this.addUser.value,
        User_created_Date: new Date().toISOString()
      }
      this.http.Adduser(userdata).subscribe({
        next: ((res: any) => {
          console.log("res", res)
          this.addUser.reset()
        })
      })
    }
  }
  goBack(event: Event) {
    // console.log( window.history.back())
    window.history.back()
    this.location.back()
  }

  get myAlbum(): FormArray {
    return this.addUser.get("myAlbum") as FormArray
  }
  delete(i: number) {
    this.myAlbum.removeAt(i)
  }
  addPhotos() {
    this.myAlbum.push(this.fb.group({
      photos: ["", Validators.required]
    }))
  }
}
