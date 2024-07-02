import { Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { GetUserComponent } from './get-user/get-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { AddUserComponent } from './add-user/add-user.component';

export const routes: Routes = [
    {path:"",component:GetUserComponent,pathMatch:"full"},
    {path:"createUser",component:CreateUserComponent,pathMatch:"full"},
    {path:"getUser",component:GetUserComponent,pathMatch:"full"},
    {path:"viewUser",component:ViewUserComponent,pathMatch:"full"},
    {path:"addUser",component:AddUserComponent,pathMatch:"full"}
];
