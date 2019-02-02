import {
  MatAutocompleteModule,
  MatMenuModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatDatepickerModule,
  MatRadioModule,
  MatNativeDateModule,
  MatSelectModule,
  MatButtonToggleModule,
  MatTabsModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatListModule,
  MatSlideToggleModule,
  MatGridListModule,
  MatDialogModule,
  MatChipsModule
} from '@angular/material'
import { NgModule } from '@angular/core'

@NgModule({
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatListModule,
    MatListModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatRadioModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatTabsModule,
    MatProgressSpinnerModule
  ]
})
export class MyCustomMaterialModule {}
