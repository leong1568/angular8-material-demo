import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {StockItem} from '../stock/_interface/search.model';
import {SearchService} from '../shared/search-service';
import {Portfolio} from './_interface/portfolio-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public displayedColumns = ['symbol',  'name' ,'price' ];
  public dataSource = new MatTableDataSource<StockItem>();
  private portfolio: Portfolio[] = [];
  color = 'primary';
  mode = 'determinate';
  value = 50;
  isLoading = true;
  private portfolioStocksConst = [{ symbol: 'BA' , name: 'Boeing '} ,{ symbol: 'BAC' , name: 'Bank Of China '} ];
  constructor(private searchService: SearchService) { }

  ngOnInit() {
     this.portfolioStocksConst.map( stock => {
        return this.searchService.quote(stock.symbol).
              subscribe(result => {
                this.portfolio.push( {...this.getLastWordInKeys(result), name: stock.name });
                this.dataSource.data = this.portfolio;
                this.isLoading = false;
              });
      }
    );
  }

  public executeSelectedChange = (event) => {
    console.log(event);
  }

  getLastWordInKeys(obj) {
    const keyValues = Object.keys(obj).map(key => {
      const splitKeyString = key.split(" ");
      const newKey = splitKeyString[splitKeyString.length-1] || key;
      return { [newKey]: obj[key] };
    });
    return Object.assign({}, ...keyValues);
  }
}
