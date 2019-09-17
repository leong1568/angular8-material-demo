import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RepositoryService } from 'src/app/shared/repository.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  public accountForm: FormGroup;
  private dialogConfig;

  constructor(private router: Router,private repository: RepositoryService,private location: Location,private dialog: MatDialog,private errorService: ErrorHandlerService) { }

  ngOnInit() {
    this.accountForm = new FormGroup({
      accountName: new FormControl('',[Validators.required]),
    });

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data:{}
    }
  }

  public createAccount = (accountFormValue)=>{
    let loginUser = JSON.parse(localStorage.getItem("user"));
    let acc = {
      ownerId:loginUser.id,
      accountName: accountFormValue.accountName,
      accountBalance: 0,
      createdDate: new Date()
    }
    this.repository.createAccount(acc).subscribe(
      res=>{
         this.router.navigate(['/user/fund']); 
      }
    );
  };

  public hasError = (controlName: string, errorName: string) =>{
    return this.accountForm.controls[controlName].hasError(errorName);
  }

  
  public onCancel = () => {
    this.location.back();
  }

}
