import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../api.service';

@Component({
  selector: 'app-view-user',
  standalone: true,
  imports: [],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent implements OnInit {
  userId!:string
  user:any
constructor(private route:ActivatedRoute, private http:APIService){
  // this.userId= this.route.snapshot.queryParamMap.get('id');

}
  ngOnInit(): void {
    this.http.getUser(this.route.snapshot.queryParamMap.get('id')).subscribe({
      next:((res:any)=>{
        this.user=res
       console.log("getUser",res,window)
      })
    })
  }
  goBack(event:Event){
    window.history.back()
  }
  // goBack(event: Event): void {
  //   console.log('Current window.history:', window.history);
  //   console.log('History length:', window.history.length);
  //   if (window.history.length > 1) {
  //     window.history.back()
  //   } else {
  //     console.log("No previous page in the history stack.");
  //   }
  // }

}
