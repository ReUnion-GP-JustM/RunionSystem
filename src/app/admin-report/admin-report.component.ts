import { Component, OnInit } from '@angular/core';
import {ReportService} from "../report.service"
@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.scss']
})
export class AdminReportComponent implements OnInit {
imgSrc:String="assets/imgs/n1.jpg";
reportContainer:any=[];
constructor(private _ReportService:ReportService) {
  /*start call method getreport to display it*/
   this.getreport();
  /*end call method getreport to display it*/
}

  ngOnInit(): void {
    
  }
/* start get report list */
  getreport(){
   this. _ReportService.getReport().subscribe(
      data => { this.reportContainer=data.articles;}
      );
      console.log(this.reportContainer.length);
  }
  /* End get report list */

  

}
