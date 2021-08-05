import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatMenuModule, MatTableModule, MatFormFieldModule, MatInputModule, MatTabsModule, MatExpansionModule, MatRadioButton, MatRadioModule, MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule, MatCardModule, MatSlideToggleModule, MatChipsModule, MatRippleModule, MatAutocompleteModule, MatDividerModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import { TempPipePipe } from './pipes/temp-pipe.pipe';
import {CalendarModule} from 'primeng/calendar';
import { AccordionModule }from 'primeng/accordion';

@NgModule({
  declarations: [TempPipePipe],
  imports: [
    CommonModule
  ],
  exports:[
    BrowserAnimationsModule,
    TempPipePipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule,
    MatMenuModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatExpansionModule,
    MatRadioModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    MatCheckboxModule,
    NgxSpinnerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatPaginatorModule,
    CalendarModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatRippleModule,
    MatAutocompleteModule,
    MatDividerModule,
    AccordionModule
  ]

})
export class MaterialModule { }
