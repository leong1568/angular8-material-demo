import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Stock } from '../../_interface/stock.model';

@Component({
  selector: 'app-stock-data',
  templateUrl: './stock-data.component.html',
  styleUrls: ['./stock-data.component.css']
})
export class StockDataComponent implements OnInit {

  @Input() public stock: Stock;

  public selectOptions = [{name:'Show', value: 'show'}, {name: `Don't Show`, value: ''}];

  @Output() selectEmitt = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public onChange = (event) => {
    this.selectEmitt.emit(event.value);
  }
}
