import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {QuoteResponse, SearchResponse} from '../stock/_interface/search.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchBaseUrl = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&apikey=DEMO';
  searchQueryUrl = '&keywords=';

  quoteBaseUrl = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&apikey=DEMO';
  quoteQueryUrl = '&symbol=';

  constructor(private http: HttpClient) { }

  search(terms) {
    return terms.pipe(debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.searchEntries(term)));
  }

  searchEntries(term) {
    if (term) {
      return this.http
        .get<SearchResponse>(this.searchBaseUrl + this.searchQueryUrl + term)
        .pipe(map(res => res.bestMatches));
    } else{
     of([]);
    }

  }

  quote(symbol: string) {
    return this.http
      .get<QuoteResponse>(this.quoteBaseUrl + this.quoteQueryUrl + symbol)
      .pipe(map(res => res['Global Quote']));
  }
}
