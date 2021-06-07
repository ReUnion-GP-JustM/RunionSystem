import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { AdminReportComponent } from './admin-report/admin-report.component';
import { ReporthistoryComponent } from './reporthistory/reporthistory.component';
import {HttpClientModule} from "@angular/common/http"
import { from } from 'rxjs';
import { AddMissingComponent } from './add-missing/add-missing.component';
import {ReactiveFormsModule} from '@angular/forms'
@NgModule({
  declarations: [
    AppComponent,
    SuperAdminComponent,
    AdminReportComponent,
    ReporthistoryComponent,
    AddMissingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
