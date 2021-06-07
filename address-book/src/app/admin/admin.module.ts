import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { Material } from '../material/material';
import { AddressComponent } from './address/address.component';
import { AddressDetailComponent } from './address-detail/address-detail.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  {
    path:'',
    component:AdminComponent,
    children:[
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path:'address',
        component:AddressComponent
      },
      {
        path:'',
        redirectTo:'/admin/dashboard',
        pathMatch:'full'
      }
    ]
  }
]

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    AddressComponent,
    AddressDetailComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Material,
    FormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
