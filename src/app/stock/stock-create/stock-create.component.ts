import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RepositoryService } from 'src/app/shared/repository.service';
import { StockForCreation } from '../_interface/stock-for-creation.model';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';

@Component({
  selector: 'app-Stock-create',
  templateUrl: './Stock-create.component.html',
  styleUrls: ['./Stock-create.component.css']
})
export class StockCreateComponent implements OnInit {

  public StockForm: FormGroup;
  private dialogConfig;

  constructor(private location: Location, private repository: RepositoryService,private dialog: MatDialog,private errorService: ErrorHandlerService) { }

  ngOnInit() {
    this.StockForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dateOfBirth: new FormControl(new Date()),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data:{}
    }
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.StockForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public createOwner = (StockFormValue) => {
    if (this.StockForm.valid) {
      this.executeOwnerCreation(StockFormValue);
    }
  }

  private executeOwnerCreation = (StockFormValue) => {
    let stock: StockForCreation = {
      name: StockFormValue.name,
      dateOfBirth: StockFormValue.dateOfBirth,
      address: StockFormValue.address
    }

    let apiUrl = 'api/Stock';
    this.repository.create(apiUrl, stock)
      .subscribe(res => {
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
    )
  }
}
