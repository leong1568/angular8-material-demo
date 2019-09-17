import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, MatMenuModule, MatTableModule, MatSortModule, MatInputModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatCheckboxModule, MatCardModule, MatSelectModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatRadioModule, MatRadioGroup } from '@angular/material';


const COMPS=[
  MatTabsModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatMenuModule,
  MatTableModule,
  MatSortModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatCardModule,
  MatSelectModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatRadioModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...COMPS
  ],
  exports:[
    ...COMPS
  ]
})
export class MaterialModule { }
