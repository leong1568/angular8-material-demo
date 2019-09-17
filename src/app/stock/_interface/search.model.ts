export interface SearchResponse {
 bestMatches: any[];
}


export class StockItem {
  'symbol': string;
  'name': string;
  'price': string;
}


export class QuoteResponse {
 'Global Quote':  any[];
}
