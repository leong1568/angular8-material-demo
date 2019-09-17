import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SuccessDialogComponent } from './dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';

const SHARED_MODULES =[
  MaterialModule,
  FlexLayoutModule
]

const SHARED_COMPONENTS = [
  SuccessDialogComponent, 
  ErrorDialogComponent
]
@NgModule({
  declarations: [...SHARED_COMPONENTS],
  imports: [
    CommonModule,
    ...SHARED_MODULES
  ],
  exports:[
    ...SHARED_MODULES,
    ...SHARED_COMPONENTS
  ],
  entryComponents:[
    ...SHARED_COMPONENTS
  ]
})
export class SharedModule { }
