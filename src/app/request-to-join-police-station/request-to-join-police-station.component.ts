import { Component, OnInit } from '@angular/core';
// import { $ } from 'protractor';
import { SuperAdminPrivalgesService } from '../super-admin-privalges.service'
declare var $:any;
@Component({
  selector: 'app-request-to-join-police-station',
  templateUrl: './request-to-join-police-station.component.html',
  styleUrls: ['./request-to-join-police-station.component.scss']
})
export class RequestToJoinPoliceStationComponent implements OnInit {
  request: any[] = [];
  load: boolean = true;
  term:any;
  constructor(private _SuperAdminPrivalgesService: SuperAdminPrivalgesService) {
    this.getAllRequrests();
  }

  ngOnInit(): void {
  }

  getAllRequrests() {
    this._SuperAdminPrivalgesService.getPoliceStationRequestToJoin().subscribe(data => {
      this.request = data.requestList;
      this.load = false


    })
  }
  stationRecord: any[] = [];
  getSationInfo(i: any) {
    this.stationRecord = [];
    this.stationRecord.push(this.request[i]);
    console.log(this.stationRecord);

  }
  aproveRequest(i: any) {
    this.load = true;
    this._SuperAdminPrivalgesService.approveRequest(i).subscribe(data => {
      if (data.message == 'aproved user') {
        alert("user aproved successfully");
        this.getAllRequrests();
        $("#exampleModal").modal("hide");
        this.load = false;
      } else if (data.message == 'already  approved user') {
        alert("already  approved user")
        this.load = false;
      } else {
        alert("fail");
        this.load = false;
      }
    })
  }
  deletePoliceStation(i: any) {
    this.load = true;
         this._SuperAdminPrivalgesService.deleteUser(i).subscribe(data=>{
          if (data.message=="user deleted successfully") {
            alert("user deleted successfull");
            this.getAllRequrests();
            $("#exampleModal").modal("hide");
          } else if (data.meaasge=="user not found") {
            alert("user not found")
          } else {
            alert("fail");
          }
          this.load = false;
         })
  }
}
