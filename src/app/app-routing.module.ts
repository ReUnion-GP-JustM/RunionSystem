import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminReportComponent } from './admin-report/admin-report.component';
import { ContactUSComponent } from './contact-us/contact-us.component';
import { AuthGuard } from './Guards/auth.guard';
import { GustReportComponent } from './gust-report/gust-report.component';
import { HomeComponent } from './home/home.component';
import { InstructionComponent } from './instruction/instruction.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { ViewHomeLessByIDComponent } from './view-home-less-by-id/view-home-less-by-id.component';

const routes: Routes = [
  {path:"" , component:LoginComponent},
  {path:"admin" ,canActivate:[AuthGuard], component:SuperAdminComponent},
  {path:"searchReport" , component:GustReportComponent},
  {path:"home" , component:HomeComponent},
  {path:"signUp" , component:SignUpComponent},
  {path:"homelessID/:id" , component:ViewHomeLessByIDComponent},
  {path:"contactUS" , component:ContactUSComponent},
  {path:'instruction' , component:InstructionComponent}

  

  // {path:"**" , component:NotFoundComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
