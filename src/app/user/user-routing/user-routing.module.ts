import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { FundComponent } from '../fund/fund.component';
import { CreateAccountComponent } from '../fund/create-account/create-account.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent},
  { path: 'fund', component: FundComponent},
  { path: 'createAccount', component: CreateAccountComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class UserRoutingModule { }
