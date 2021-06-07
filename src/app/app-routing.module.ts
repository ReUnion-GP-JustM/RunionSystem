import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminReportComponent } from './admin-report/admin-report.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';

const routes: Routes = [
  {path:"" , component:SuperAdminComponent},
  {path:"adminReport" , component:AdminReportComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
