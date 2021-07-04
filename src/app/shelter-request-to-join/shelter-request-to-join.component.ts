import { Component, OnInit } from '@angular/core';
import { SuperAdminPrivalgesService } from '../super-admin-privalges.service'
declare var $:any;
@Component({
  selector: 'app-shelter-request-to-join',
  templateUrl: './shelter-request-to-join.component.html',
  styleUrls: ['./shelter-request-to-join.component.scss']
})
export class ShelterRequestToJoinComponent implements OnInit {
  request: any[] = [];
  load: boolean = true;
  term:any;

  constructor(public _SuperAdminPrivalgesService:SuperAdminPrivalgesService) { 
    this.getAllRequrests();
  }

  ngOnInit(): void {
  }
  getAllRequrests() {
    this._SuperAdminPrivalgesService.getShelterRequestToJoin().subscribe(data => {
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
      } else if (data.message == 'already  approved user') {
        alert("already  approved user")
      } else {
        alert("fail");
      }
      this.load = false;
    })
  }
  deleteshelter(i: any) {
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
