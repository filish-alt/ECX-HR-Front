import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { HttpClientModule } from '@angular/common/http';
import { MedicalreportComponent } from './modules/medical/medicalreport/medicalreport.component';
import { OutsourceComponent } from './modules/PayrollContract/outsource/outsource.component';
import * as Dashboards from '@highcharts/dashboards/dashboards';

@NgModule({
  declarations: [
    AppComponent,

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
       HttpClientModule,
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
