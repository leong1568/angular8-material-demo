import { Component, OnInit, ViewChild } from '@angular/core';
import { TradingAccount } from '../../_interface/trading-account.model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { RepositoryService } from 'src/app/shared/repository.service';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trading-account',
  templateUrl: './trading-account.component.html',
  styleUrls: ['./trading-account.component.css']
})
export class TradingAccountComponent implements OnInit {
  public displayedColumns = ['accountName', 'createdDate', 'accountBalance', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<TradingAccount>();

  @ViewChild(MatSort,{static: false}) sort: MatSort;

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  
  constructor(private repoService: RepositoryService,private errorService: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.getAllUserAccounts();
  }

  public getAllUserAccounts = () => {
    this.repoService.getData('api/users/1/accounts')
    .subscribe(res => {
      this.dataSource.data = res as TradingAccount[];
    })
  }

}
