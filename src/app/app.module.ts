import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { AdminReportComponent } from './admin-report/admin-report.component';
import { ReporthistoryComponent } from './reporthistory/reporthistory.component';
import {HttpClientModule} from "@angular/common/http"
import { from } from 'rxjs';
import { AddMissingComponent } from './add-missing/add-missing.component';
import {ReactiveFormsModule} from '@angular/forms';
import { GetAllHomelessComponent } from './get-all-homeless/get-all-homeless.component';
import { GetAllPoliceStationsComponent } from './get-all-police-stations/get-all-police-stations.component';
import { RequestToJoinPoliceStationComponent } from './request-to-join-police-station/request-to-join-police-station.component';
import { GetAllSheltersComponent } from './get-all-shelters/get-all-shelters.component';
import { ShelterRequestToJoinComponent } from './shelter-request-to-join/shelter-request-to-join.component';
import { HomlessHistoryComponent } from './homless-history/homless-history.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MapComponent } from './map/map.component'
import { AgmCoreModule } from '@agm/core';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ShelterHomeLessComponent } from './shelter-home-less/shelter-home-less.component';
import { ShelterHomeLessHistoryComponent } from './shelter-home-less-history/shelter-home-less-history.component';
import { GustReportComponent } from './gust-report/gust-report.component';
import { HomeComponent } from './home/home.component';
import { ReportSearchPipe } from './report-search.pipe';
import { HomeLessSearchPipe } from './home-less-search.pipe';
import { UserSearchPipe } from './user-search.pipe';
import { NotFoundComponent } from './not-found/not-found.component';
import { ViewHomeLessByIDComponent } from './view-home-less-by-id/view-home-less-by-id.component';
import { FooterComponent } from './footer/footer.component';
import { ContactUSComponent } from './contact-us/contact-us.component';
import { InstructionComponent } from './instruction/instruction.component';
declare var google:any;
@NgModule({
  declarations: [
    AppComponent,
    SuperAdminComponent,
    AdminReportComponent,
    ReporthistoryComponent,
    AddMissingComponent,
    GetAllHomelessComponent,
    GetAllPoliceStationsComponent,
    RequestToJoinPoliceStationComponent,
    GetAllSheltersComponent,
    ShelterRequestToJoinComponent,
    HomlessHistoryComponent,
    NavBarComponent,
    MapComponent,
    LoginComponent,
    SignUpComponent,
    ShelterHomeLessComponent,
    ShelterHomeLessHistoryComponent,
    GustReportComponent,
    HomeComponent,
    ReportSearchPipe,
    HomeLessSearchPipe,
    UserSearchPipe,
    NotFoundComponent,
    ViewHomeLessByIDComponent,
    FooterComponent,
    ContactUSComponent,
    InstructionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDHras_JUHP0M-wD0WpzYG-_6JDBIOUSN0'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
