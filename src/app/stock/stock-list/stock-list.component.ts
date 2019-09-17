import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Stock } from '../_interface/stock.model';
import { RepositoryService } from 'src/app/shared/repository.service';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { Router } from '@angular/router';
import {SearchService} from '../../shared/search-service';
import {BehaviorSubject, Subject} from 'rxjs';
import {StockItem} from '../_interface/search.model';


@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  searchTerm$ = new Subject<string>();
  stockItems: StockItem[] = [];
  public displayedColumns = ['symbol', 'name',  'price' , 'update', 'delete'];
  public dataSource = new MatTableDataSource<StockItem>();

  @ViewChild(MatSort,{static: false}) sort: MatSort;

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;

  constructor(private repoService: RepositoryService, private errorService: ErrorHandlerService, private router: Router , private searchService: SearchService) { }

  ngOnInit() {
    this.searchService.search(this.searchTerm$)
      .subscribe(results => {
        this.stockItems =  results.map( resp => {
          let  stockItem = new StockItem();
          stockItem.name=  resp['2. name'];
          stockItem.symbol = resp['1. symbol'];
          return stockItem;}
        );

        // this.stockItems.map( stockItem =>  {
        //   this.searchService.quote( stockItem.symbol)
        //     .subscribe(resp => stockItem.price = resp['05. price']);
        // })
        this.dataSource.data =  this.stockItems;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }



  public redirectToDetails = (id: string) => {
    let url: string = `/stock/details/${id}`;
    this.router.navigate([url]);
  }

  public redirectToBuy = (symbol: string) => {
    let url: string = `/stock/details/${symbol}`;
    this.router.navigate([url]);
  }

  public redirectToDelete = (id: string) => {

  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
