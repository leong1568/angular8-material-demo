import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockRoutingModule } from './stock-routing/stock-routing.module';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { StockDataComponent } from './stock-details/stock-data/stock-data.component';
import { AccountDataComponent } from './stock-details/account-data/account-data.component';
import { StockCreateComponent } from './stock-create/stock-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [StockListComponent, StockDetailsComponent, StockDataComponent, AccountDataComponent, StockCreateComponent],
  imports: [
    CommonModule,
    StockRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class StockModule { }
