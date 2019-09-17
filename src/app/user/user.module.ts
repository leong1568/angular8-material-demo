import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserRoutingModule } from './user-routing/user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DepositComponent } from './fund/deposit/deposit.component';
import { WithdrawComponent } from './fund/withdraw/withdraw.component';
import { FundComponent } from './fund/fund.component';
import { TradingAccountComponent } from './fund/trading-account/trading-account.component';
import { CreateAccountComponent } from './fund/create-account/create-account.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, DepositComponent, WithdrawComponent, FundComponent, TradingAccountComponent, CreateAccountComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
