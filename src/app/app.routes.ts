import { Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { GetUserComponent } from './get-user/get-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ChatComponentComponent } from './chat-component/chat-component.component';
import { GetAddUserComponent } from './get-add-user/get-add-user.component';
import { TrackerComponent } from './tracker/tracker.component';
import { DeptWiseOPDSummaryReportComponent } from './dept-wise-opdsummary-report/dept-wise-opdsummary-report.component';
import { NameComponentComponent } from './name/name-component/name-component.component';
import { TableComponent } from './name/table/table.component';
import { DatesearchComponent } from './name/datesearch/datesearch.component';
import { MonthsearchComponent } from './name/monthsearch/monthsearch.component';
import { SelectwholeyearComponent } from './name/selectwholeyear/selectwholeyear.component';

export const routes: Routes = [
    {path:"",component:GetUserComponent,pathMatch:"full"},
    {path:"createUser",component:CreateUserComponent,pathMatch:"full"},
    {path:"getUser",component:GetUserComponent,pathMatch:"full"},
    {path:"viewUser",component:ViewUserComponent,pathMatch:"full"},
    {path:"addUser",component:AddUserComponent,pathMatch:"full"},
    {path:"play-msg-msg",component:ChatComponentComponent,pathMatch:"full"},
    {path:"getAdd-user",component:GetAddUserComponent,pathMatch:"full"},
    {path:"tracker",component:TrackerComponent} ,
    {path:"summary",component:DeptWiseOPDSummaryReportComponent} ,
    {path:"name",component:NameComponentComponent},
    {path:"table",component:TableComponent},
    {path:"date",component:DatesearchComponent},
    {path:"month",component:MonthsearchComponent},
    {path:"year",component:SelectwholeyearComponent}
    
    
    
];
