import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SuperAdminPrivalgesService } from '../super-admin-privalges.service'
declare var $: any
@Component({
  selector: 'app-get-all-police-stations',
  templateUrl: './get-all-police-stations.component.html',
  styleUrls: ['./get-all-police-stations.component.scss']
})
export class GetAllPoliceStationsComponent implements OnInit {
  policeStationLists: any[] = [];
  load: boolean = true;
  term: any;
  constructor(private _SuperAdminPrivalgesService: SuperAdminPrivalgesService) {
    this.getAllPloceStation();
  }

  ngOnInit(): void {
  }
  changeRole = new FormGroup({
    role: new FormControl('policeStation', [Validators.required])
  })
  getAllPloceStation() {
    this._SuperAdminPrivalgesService.getAllPoliceSations().subscribe(response => {
      if (response.message == 'done') {

        this.policeStationLists = response.policeStationList;
        console.log("kkk");

        console.log(this.policeStationLists);

        this.load = false;
      } else {
        console.log("fail");

      }
    })

  }

  recordID: any;
  arrayID: any;
  stationRecord: any[] = [];
  getSationInfo(i: any) {
    this.arrayID = i;
    this.stationRecord = []
    this.recordID = this.policeStationLists[i]._id;
    this.stationRecord.push(this.policeStationLists[i]);
    console.log(this.stationRecord);

  }

  changeUserRole() {
    this.load = true;
    let mydata = {
      role: this.changeRole.controls.role.value
    }
    this._SuperAdminPrivalgesService.changeUserRole(mydata, this.recordID).subscribe(data => {
      console.log(data.message);

      if (data.message == "Done") {
        alert("updated successfully");
        this.getAllPloceStation();
        $("#exampleModal").modal("hide");
        this.load = false;
      } else if (data.message == "invalid user") {
        alert("invalid user");
        this.load = false;
      } else {
        alert("fail- try again");
        this.load = false;
      }
    })
  }

  deletePoliceStation() {
    this.load = true;
    this._SuperAdminPrivalgesService.deleteUser(this.recordID).subscribe(data => {

      if (data.message == "user deleted successfully") {
        alert("user deleted successfully");
        this.getAllPloceStation();
        $("#exampleModal").modal("hide");
        this.load = false;
      } else if (data.message == "user not found") {
        alert("invalid user");
        this.load = false;
      } else {
        alert("fail- try again");
        this.load = false;
      }
    })
  }



}
