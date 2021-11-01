import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatChipsModule} from "@angular/material/chips";
import {MatButtonModule} from "@angular/material/button";
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
        ChartsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
