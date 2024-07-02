import { Component, OnInit, ViewChild } from '@angular/core';
import { APIService } from '../api.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
export interface Address {
  state: string;
  district: string;
  location: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  mobile: number;
  dob: string;
}

export interface PeriodicElement {
  id: string;
  personalInfo: PersonalInfo;
  gender: string;
  skills: string[];
  address: Address[];
}


@Component({
  selector: 'app-get-user',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatButtonModule, MatDialogModule,
     MatIconModule,MatFormFieldModule,MatInputModule,FormsModule,
     MatPaginator,RouterModule,MatProgressSpinnerModule],
  templateUrl: './get-user.component.html',
  styleUrl: './get-user.component.css'
})
export class GetUserComponent implements OnInit {
  isLoading:boolean=false
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'mobile', 'gender', 'skills', 'address', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // dataSource: PeriodicElement[] = []
  constructor(private http: APIService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<PeriodicElement>();
  }

  ngOnInit(): void {
    this.getUsers()
  }
  // getUsers() {
  //   this.isLoading=true
  //   setTimeout(()=>{
  //     this.http.getUsers().subscribe((res: any) => {
  //       console.log("getUsers", res)
  //       this.dataSource.data = res
  //       this.dataSource.paginator= this.paginator;
  //       console.log(" this.dataSource.data", this.dataSource.data)
  //       console.log(" this.dataSource", this.dataSource)
  //       console.log(" this.dataSource.paginator", this.dataSource.paginator)
  //       this.isLoading=false
  //     })
  //   },2000)
  // }
  getUsers() {
    this.isLoading=true
    this.http.getUsers().subscribe((res: any) => {
      console.log("getUsers", res)
      this.dataSource.data = res
      this.dataSource.paginator= this.paginator;
      console.log(" this.dataSource.data", this.dataSource.data)
      console.log(" this.dataSource", this.dataSource)
      console.log(" this.dataSource.paginator", this.dataSource.paginator)
      this.isLoading=false
    })
  }


  openDialog() {
    const dialogRef = this.dialog.open(CreateUserComponent);
    dialogRef.afterClosed().subscribe((res: any) => {
      console.log(`Dialog result: ${res}`);
      this.getUsers()
    });
  }
  edit(data: any) {
    const dialogRef=this.dialog.open(CreateUserComponent,{data})
    dialogRef.afterClosed().subscribe((res:any)=>{
      if(res){
        this.getUsers()
      }
    })
    console.log("data", data)
  }
  delete(id: any) {
    console.log("id", id)
    this.http.deleteUser(id).subscribe({
      next:((res:any)=>{
        console.log("deleted", res)
        this.getUsers()
      })
    })
  }
  searchText(event:Event){
    console.log("Filterevent",event)
    const input=(event.target as HTMLInputElement).value
    this.dataSource.filter=input
  }
  pageChangeEvent(event:PageEvent){
  console.log("PageEvent",event)
  }

}
