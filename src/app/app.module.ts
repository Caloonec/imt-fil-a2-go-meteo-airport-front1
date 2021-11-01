import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatChipsModule} from "@angular/material/chips";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from "@angular/forms";

import { MatNativeDateModule } from '@angular/material/core';
import {HttpClientModule} from "@angular/common/http";
import { ChartsModule } from 'ng2-charts';
import { LineChartComponent } from './line-chart/line-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatChipsModule,
        MatButtonModule,
        HttpClientModule,
        ChartsModule,
        MatDatepickerModule,
        FormsModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule,
        
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
