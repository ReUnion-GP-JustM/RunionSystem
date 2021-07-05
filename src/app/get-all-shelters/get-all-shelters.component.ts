import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SuperAdminPrivalgesService } from '../super-admin-privalges.service'
declare var $: any
@Component({
  selector: 'app-get-all-shelters',
  templateUrl: './get-all-shelters.component.html',
  styleUrls: ['./get-all-shelters.component.scss']
})
export class GetAllSheltersComponent implements OnInit {
  load: boolean = true;
  shelterList: any[] = [];
  term: any;
  load3:boolean = false;
  changeRole = new FormGroup({
    role: new FormControl('shelter', [Validators.required])
  })
  constructor(private _SuperAdminPrivalgesService: SuperAdminPrivalgesService) {
    this.getAllShelter();
  }

  ngOnInit(): void {
  }

  getAllShelter() {
    this._SuperAdminPrivalgesService.getAllShlter().subscribe(response => {
      console.log(response);

      if (response.message == 'done') {
        this.shelterList = response.shelterList;
        this.load = false;
      } else {
        this.load = false;

        console.log("fail");

      }
    })

  }






  recordID: any;
  arrayID: any;
  shelterRecord: any[] = [];
  getShlterInfo(i: any) {
    this.arrayID = i;
    this.shelterRecord = []
    this.recordID = this.shelterList[i]._id;
    this.shelterRecord.push(this.shelterList[i]);
    console.log(this.shelterRecord);

  }

  changeUserRole() {
    this.load3 = true;
    let mydata = {
      role: this.changeRole.controls.role.value
    }
    this._SuperAdminPrivalgesService.changeUserRole(mydata, this.recordID).subscribe(data => {
      console.log(data.message);

      if (data.message == "Done") {
        alert("updated successfully");
        this.getAllShelter();
        $("#exampleModal").modal("hide");
      } else if (data.message == "invalid user") {
        alert("invalid user");
      } else {
        alert("fail- try again");
      }
      this.load3=false;
    })
  }

  deletePoliceStation() {
    this.load3= true;
    this._SuperAdminPrivalgesService.deleteUser(this.recordID).subscribe(data => {

      if (data.message == "user deleted successfully") {
        alert("user deleted successfully");
        this.getAllShelter();
        $("#exampleModal").modal("hide");
      } else if (data.message == "user not found") {
        alert("invalid user");
      } else {
        alert("fail- try again");
      }
      this.load3 = false
    })
  }


}
