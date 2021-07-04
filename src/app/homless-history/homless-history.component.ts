import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomelessService } from '../homeless.service';
import { SuperAdminPrivalgesService } from '../super-admin-privalges.service';
import { UserService } from '../user.service';
declare var $: any
@Component({
  selector: 'app-homless-history',
  templateUrl: './homless-history.component.html',
  styleUrls: ['./homless-history.component.scss']
})
export class HomlessHistoryComponent implements OnInit {
  homelessList: any[] = [];
  filterdContainer: any[] = [];
  homelessRecord: any[] = [];
  load2: boolean = false;
  load: boolean = true;
  filterName: any;
  filterAge: any;
  shelterList: any;
  fCity: any = "all";
  fPolice: any = "all";
  fReportID: any;
  policeStationLists: any;
  egyptCity: any;


  constructor(public _HomelessService: HomelessService, public _SuperAdminPrivalgesService: SuperAdminPrivalgesService, public _UserService: UserService) {

    this.getAllHomeless()
    this.getAllShelter();
    this.getAllPloceStation();
    this.egyptCity = _UserService.egyptCity;

  }
  getAllPloceStation() {
    this._SuperAdminPrivalgesService.getAllPoliceSations().subscribe(response => {
      if (response.message == 'done') {

        this.policeStationLists = response.policeStationList;

      } else {
        console.log("fail");

      }
    })

  }

  getAllShelter() {
    this._SuperAdminPrivalgesService.getAllShlter().subscribe(response => {
      if (response.message == 'done') {
        this.shelterList = response.shelterList;
        this.load = false;
      } else {
        console.log("fail");

      }
    })

  }

  ngOnInit(): void {
  }
  getAllHomeless() {
    this._HomelessService.getAllHomeless().subscribe(response => {
      if (response.message == 'Done') {
        this.homelessList = response.homeLessList;
        this.load = false;
        this.filterDataContainer();
        console.log(this.homelessList);

      } else {
        console.log("fail");

      }
    })

  }
  homelessInfo() {

  }

  homelessDetails(i: any) {
    console.log(i);
    for (let index = 0; index < this.homelessList.length; index++) {
      if (this.homelessList[index]._id == i) {
        this.homelessRecord = [];
        this.homelessRecord.push(this.homelessList[index]);
      }

    }


  }

  filterDataContainer() {
    this.filterdContainer = [];
    for (let i = 0; i < this.homelessList.length; i++) {
      if (this.homelessList[i].status == 'closed') {
        this.filterdContainer.push(this.homelessList[i])


      }

    }
  }

  archive(id: any) {
    this.load = true;
    this._HomelessService.closeHomeless(id).subscribe(response => {
      if (response.message == "homless closed successfully") {
        alert("homless closed successfully");
        this.getAllHomeless()
        $("#exampleModal").modal("hide");
        this.load = false;

      } else if (response.message == "homless  alrady closed ") {
        // $("#exampleModal1").modal("hide");
        alert("homless  alrady closed ");
        this.load = false;
      } else {
        alert("fail to close please try again");
        this.load = false;
      }
    })
  }

  undifinedHomeless(id: any) {
    this.load = true;
    this._HomelessService.undifinedHomeless(id).subscribe(response => {
      if (response.message == "homless undefined successfully") {
        alert("homless closed successfully");
        this.getAllHomeless()
        $("#exampleModal").modal("hide");
        this.load = false;

      } else if (response.message == "homless  alrady undefined") {
        // $("#exampleModal1").modal("hide");
        alert("homless  alrady undefined ");
        this.load = false;
      } else {
        alert("fail to close please try again");
        this.load = false;
      }
    })
  }

  images: any;

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      console.log(this.images);

    }
  }




  addMissing = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[\u0621-\u064Aء-ئ][^#&<>\"~;$^%{}?]{2,20}$/)]),
    age: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
    gender: new FormControl(``, [Validators.required]),
    description: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    foundTime: new FormControl('', []),
    shelterName: new FormControl('', [Validators.required]),
    // stationName: new FormControl('', [Validators.required]),
    image: new FormControl('', []),
    finderName: new FormControl('', [Validators.required, Validators.pattern(/^[\u0621-\u064Aء-ئ][^#&<>\"~;$^%{}?]{2,20}$/)]),
    nationID: new FormControl('', [Validators.required, Validators.pattern(/(2|3)[0-9][1-9][0-1][1-9][0-3][1-9](01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)\d\d\d\d\d/)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    finderEmail: new FormControl('', [Validators.email, Validators.required])

  });

  getReportData() {
    console.log(this.homelessRecord[0]);
    this.addMissing.controls.name.setValue(this.homelessRecord[0].name)
    this.addMissing.controls.age.setValue(this.homelessRecord[0].age)
    this.addMissing.controls.gender.setValue(this.homelessRecord[0].gender)
    this.addMissing.controls.description.setValue(this.homelessRecord[0].description)
    this.addMissing.controls.city.setValue(this.homelessRecord[0].foundlocation)
    this.addMissing.controls.foundTime.setValue(this.homelessRecord[0].foundTime)
    this.addMissing.controls.shelterName.setValue(this.homelessRecord[0].shelterID.userName)
    // this.addMissing.controls.stationName.setValue(this.homelessRecord[0].policeSationID.userName)
    this.addMissing.controls.finderName.setValue(this.homelessRecord[0].finderName)
    this.addMissing.controls.nationID.setValue(this.homelessRecord[0].finderNationID)
    this.addMissing.controls.phoneNumber.setValue(this.homelessRecord[0].finderPhone)
    this.addMissing.controls.finderEmail.setValue(this.homelessRecord[0].finderEmail)
  }
  handelEditReport(id: any) {
    console.log(id);

    $("#exampleModal").modal("hide");

    this.load2 = true;

    console.log(this.addMissing.controls.foundTime.value);
    console.log(this.addMissing.controls.description.value);


    if (this.addMissing.valid) {
      if (this.images == undefined) {
        this.images = this.homelessRecord[0].imageURl
      }
      if (this.addMissing.controls.foundTime.value == undefined) {
        this.addMissing.controls.foundTime.setValue(this.homelessRecord[0].lostTime)
        console.log(this.addMissing.controls.foundTime.value);

      }
      if (this.addMissing.controls.description.value == undefined) {
        this.addMissing.controls.description.setValue(this.homelessRecord[0].description)
      }
      console.log(this.images);
      // append new data
      let formData = new FormData();
      formData.append("img", this.images);
      formData.append("name", this.addMissing.controls.name.value);
      formData.append("age", this.addMissing.controls.age.value);
      formData.append("gender", this.addMissing.controls.gender.value);
      formData.append("description", this.addMissing.controls.description.value);
      formData.append("foundlocation", this.addMissing.controls.city.value);
      formData.append("foundTime", this.addMissing.controls.foundTime.value);
      formData.append("shelterName", this.addMissing.controls.shelterName.value);
      // formData.append("policeStationName", this.addMissing.controls.stationName.value);
      formData.append("finderName", this.addMissing.controls.finderName.value);
      formData.append("finderNationID", this.addMissing.controls.nationID.value);
      formData.append("finderPhone", this.addMissing.controls.phoneNumber.value);
      formData.append("finderEmail", this.addMissing.controls.finderEmail.value);

      if (this.homelessRecord[0].reportID != null || this.homelessRecord[0].reportID != undefined) {
        formData.append("reportID", this.homelessRecord[0].reportID._id);

      }


      console.log(formData.get('img'));

      this._HomelessService.edithomelessInfo(id, formData).subscribe(data => {
        console.log(data);

        if (data.message == "invalid homless") {
          this.load2 = false;

          alert("invalid homless please try again")
        } else if (data.message == "updated successfully") {
          this.load2 = false;

          alert("updated Successfully");
          this.getAllHomeless();
          $("#editModel").modal("hide");
          this.addMissing.reset();

        } else {
          this.load2 = false;

          alert("in-valid Data Please try again");
        }
      })



    }



  }

}
