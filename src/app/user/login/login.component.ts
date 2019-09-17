import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RepositoryService } from 'src/app/shared/repository.service';
import { Location } from '@angular/common';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  private dialogConfig;
  
  constructor(private location: Location, private repository: RepositoryService,private dialog: MatDialog, private errorService: ErrorHandlerService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data:{}
    }
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  public login = (loginFormValue) => {
    if (this.loginForm.valid) {
      let user = {
        username: loginFormValue.username,
        password: loginFormValue.password
      }
      this.repository.login(user).subscribe(res => {
          localStorage.setItem('user', JSON.stringify(res))
          this.location.back();
        },
        (error => {
          //temporary as well
          this.errorService.dialogConfig = {...this.dialogConfig};
          this.errorService.handleError(error);
        })
      )
    }
  }
}
