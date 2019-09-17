import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RepositoryService } from 'src/app/shared/repository.service';
import { MatDialog } from '@angular/material';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { Location } from '@angular/common';
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';
import { User } from '../../_interface/user.model';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  public depositForm: FormGroup;
  private dialogConfig;
  
  constructor(private location: Location, private repository: RepositoryService,private dialog: MatDialog,private errorService: ErrorHandlerService) { }

  ngOnInit() {
    this.depositForm = new FormGroup({
      amount: new FormControl('', [Validators.required]),
    });

    
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data:{}
    }
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.depositForm.controls[controlName].hasError(errorName);
  }

  
  public onCancel = () => {
    this.location.back();
  }
 
  public deposit = (depositFormValue) => {
    if (this.depositForm.valid) {
      let loginUser: User = JSON.parse(localStorage.getItem("user"));
      let transaction = {
        type:"DEPOSIT",
        transactionAmount:depositFormValue.amount,
        description:"User Deposit",
        transactionDate: new Date(),
        userId: loginUser.id,
      }
      this.repository.deposit(transaction).subscribe(
        res=>{
          //this is temporary, until we create our dialogs
          let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
  
          dialogRef.afterClosed().subscribe(
            result =>{
              this.location.back();
            }
          );
        },
        (error => {
          //temporary as well
          this.errorService.dialogConfig = {...this.dialogConfig};
          this.errorService.handleError(error);
        })
      );
    }
  }


}
