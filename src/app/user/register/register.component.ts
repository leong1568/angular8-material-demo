import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { User } from '../_interface/user.model';
import { RepositoryService } from 'src/app/shared/repository.service';
import { MatDialog, ErrorStateMatcher } from '@angular/material';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';
import { Location } from '@angular/common';

class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  private dialogConfig;

  constructor(private fb: FormBuilder, private location: Location, private repository: RepositoryService,private dialog: MatDialog,private errorService: ErrorHandlerService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: new FormControl('', [Validators.required,Validators.maxLength(60), Validators.minLength(5),]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.email]),

      password: new FormControl('', [Validators.required]),
      verifyPassword: new FormControl('', [Validators.required])
    },{
      validator: this.passwordValidator
    });

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data:{}
    }

  }

  passwordValidator(form: FormGroup) {
    const condition = form.get('password').value !== form.get('verifyPassword').value;

    return condition ? { passwordsDoNotMatch: true} : null;
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  public regiser = (registerFormValue) => {
    if (this.registerForm.valid) {
      this.executeUserRegistration(registerFormValue);
    }
  }

  private executeUserRegistration = (registerFormValue) => {
    let newUser: User = {
      id: '',
      username: registerFormValue.username,
      passord: registerFormValue.password,
      firstName: registerFormValue.firstName,
      lastName: registerFormValue.lastName,
      email: registerFormValue.email
    }
 
    this.repository.register(newUser)
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
