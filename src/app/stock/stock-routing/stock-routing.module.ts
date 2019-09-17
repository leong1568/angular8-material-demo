import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StockListComponent } from '../stock-list/stock-list.component';
import { StockDetailsComponent } from '../stock-details/stock-details.component';
import { StockCreateComponent } from '../stock-create/stock-create.component';

const routes: Routes = [
  { path: 'stocks', component: StockListComponent },
  { path: 'details/:id', component: StockDetailsComponent},
  { path: 'create', component: StockCreateComponent}
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
export class StockRoutingModule { }
