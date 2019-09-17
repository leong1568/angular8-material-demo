import { Component, OnInit } from '@angular/core';
import { Stock } from '../_interface/stock.model';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { RepositoryService } from 'src/app/shared/repository.service';
import { ActivatedRoute, Router } from '@angular/router';
import {SearchService} from '../../shared/search-service';
import {Quote} from '../_interface/quote.model';
import {StockItem} from '../_interface/search.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {User} from '../../user/_interface/user.model';
import {SuccessDialogComponent} from '../../shared/dialogs/success-dialog/success-dialog.component';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {
  public quoteForm: FormGroup;
  public quote;
  public showAccounts;

  constructor(private repository: RepositoryService, private router: Router,
              private activeRoute: ActivatedRoute, private searchService : SearchService ,
              private errorHandler: ErrorHandlerService, private location: Location) { }

  ngOnInit() {
    this.quoteStockDetails();
    this.quoteForm = new FormGroup({
      quanity: new FormControl('', [Validators.required]),
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.quoteForm.controls[controlName].hasError(errorName);
  }


  public onCancel = () => {
    this.location.back();
  }

  public purchaseStock = (quoteFormValue) => {
    // if (this.quoteForm.valid) {
    //   let loginUser: User = JSON.parse(localStorage.getItem("user"));
    //   let transaction = {
    //     type:"DEPOSIT",
    //     transactionAmount:quoteFormValue.amount,
    //     description:"User Deposit",
    //     transactionDate: new Date(),
    //     userId: loginUser.id,
    //   }
    //   this.repository.deposit(transaction).subscribe(
    //     res=>{
    //       //this is temporary, until we create our dialogs
    //       let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
    //
    //       dialogRef.afterClosed().subscribe(
    //         result =>{
    //           this.location.back();
    //         }
    //       );
    //     },
    //     (error => {
    //       //temporary as well
    //       this.errorService.dialogConfig = {...this.dialogConfig};
    //       this.errorService.handleError(error);
    //     })
    //   );
    }


  private quoteStockDetails = () =>{
    let symbol = this.activeRoute.snapshot.params['id'];
    this.searchService.quote( symbol)
      .subscribe(resp => {
         this.quote = this.getLastWordInKeys(resp);
         console.log(this.quote);
        }
        );
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
