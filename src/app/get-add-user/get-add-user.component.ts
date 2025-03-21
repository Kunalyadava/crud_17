import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';

@Component({
  selector: 'app-get-add-user',
  standalone: true,
  imports: [],
  templateUrl: './get-add-user.component.html',
  styleUrl: './get-add-user.component.css'
})
export class GetAddUserComponent implements OnInit{
  constructor(private http:APIService){

  }
  ngOnInit(): void {
   this.http.getAddedUser().subscribe({
    next:((res:any)=>{
      console.log("res",res)
    })
   })
  }

}
