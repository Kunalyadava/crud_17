import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class AddUserComponent implements OnInit{
  profilePicture: string | undefined;
  addUser: FormGroup

  countries: string[] = ['Country1', 'Country2', 'Country3', 'Country4', 'Country5']; // Example list of countries
  states: { [key: string]: string[] } = {
    Country1: ['State1A', 'State1B', 'State1C'],
    Country2: ['State2A', 'State2B', 'State2C'],
    Country3: ['State3A', 'State3B', 'State3C'],
    Country4: ['State4A', 'State4B', 'State4C'],
    Country5: ['State5A', 'State5B', 'State5C']
  }; // Example list of states mapped by country
  districts: { [key: string]: string[] } = {
    State1A: ['District1A1', 'District1A2', 'District1A3'],
    State1B: ['District1B1', 'District1B2', 'District1B3'],
    State1C: ['District1C1', 'District1C2', 'District1C3'],
    State2A: ['District2A1', 'District2A2', 'District2A3'],
    State2B: ['District2B1', 'District2B2', 'District2B3'],
    State2C: ['District2C1', 'District2C2', 'District2C3'],
    State3A: ['District3A1', 'District3A2', 'District3A3'],
    State3B: ['District3B1', 'District3B2', 'District3B3'],
    State3C: ['District3C1', 'District3C2', 'District3C3'],
    State4A: ['District4A1', 'District4A2', 'District4A3'],
    State4B: ['District4B1', 'District4B2', 'District4B3'],
    State4C: ['District4C1', 'District4C2', 'District4C3'],
    State5A: ['District5A1', 'District5A2', 'District5A3'],
    State5B: ['District5B1', 'District5B2', 'District5B3'],
    State5C: ['District5C1', 'District5C2', 'District5C3']
  }
  filteredStates: string[] = [];
  filteredDistricts: string[] = [];

  constructor(private fb: FormBuilder, private http: APIService, private location: Location) {
    this.addUser = this.fb.group({
      userInfo: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        name: ['', [Validators.required, Validators.pattern(/^[^./]+$/),
        Validators.minLength(2), Validators.maxLength(15)]]
      }),
      hobbies: this.fb.array([], [Validators.minLength(2)]),
      myAlbum: this.fb.array([], [Validators.minLength(2)]),
      profilePicture: [''] ,// Form control for profile picture
      country: ['', Validators.required],
      state: ['', Validators.required],
      district: ['', Validators.required]
    })
    this.addUser.get('country')?.valueChanges.subscribe((selectedCountry: string) => {
      this.filteredStates = this.states[selectedCountry] || [];
      this.addUser.get('state')?.setValue(''); // Reset state selection
      this.filteredDistricts = []; // Reset districts when country changes
    });

    // Subscribe to state changes to update districts
    this.addUser.get('state')?.valueChanges.subscribe((selectedState: string) => {
      this.filteredDistricts = this.districts[selectedState] || [];
      this.addUser.get('district')?.setValue(''); // Reset district selection
    });
  }
  ngOnInit() {
    const defaultCountry = this.countries[0]; // Set default country
    this.addUser.get('country')?.setValue(defaultCountry);
    this.filteredStates = this.states[defaultCountry] || [];
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
  handleProfilePictureInput(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        this.profilePicture = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  Submit() {
    if (this.addUser.valid) {
      const userData = {
        ...this.addUser.value,
        profilePicture: this.profilePicture, 
        User_created_Date: new Date().toISOString()
      };

      this.http.Adduser(userData).subscribe({
        next: (res: any) => {
          console.log('User added successfully', res);
          this.addUser.reset();
          this.profilePicture = undefined; 
        },
        error: (err: any) => {
          console.error('Error adding user', err);
        }
      });
    }
  }

  // Submit() {
  //   console.log("this.addUser", this.addUser)
  //   // console.log(this.addUser.value)
  //   if (this.addUser.valid) {
  //     const userdata = {
  //       ...this.addUser.value,
  //       User_created_Date: new Date().toISOString()
  //     }
  //     this.http.Adduser(userdata).subscribe({
  //       next: ((res: any) => {
  //         console.log("res", res)
  //         this.addUser.reset()
  //       })
  //     })
  //   }
  // }
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
