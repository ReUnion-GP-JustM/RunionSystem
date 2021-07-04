import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportService } from '../report.service';
import { SuperAdminPrivalgesService } from '../super-admin-privalges.service';
import { UserService } from '../user.service';
declare var $: any;
@Component({
  selector: 'app-reporthistory',
  templateUrl: './reporthistory.component.html',
  styleUrls: ['./reporthistory.component.scss']
})
export class ReporthistoryComponent implements OnInit {
  reportContainer: any[] = [];
  filterdContainer: any[] = [];
  reportRecord: any[] = [];
  load: boolean = true;
  load2: boolean = false;
  filterName: any;
  filterAge: any;
  egyptCity: any;
  fCity: any = "all";
  fPolice: any = "all";
  fReportID: any;
  policeStationLists: any;
  constructor(public _ReportService: ReportService, public _UserService: UserService, public _SuperAdminPrivalgesService: SuperAdminPrivalgesService) {

    this.getreport();
    this.egyptCity = _UserService.egyptCity;
    this.getAllPloceStation();
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
  ngOnInit(): void {
  }

  /* start get report list */
  getreport() {
    console.log("jjj");

    this._ReportService.getReport().subscribe(data => {
      this.reportContainer = data.reportList;
      this.fillterReport();
      this.load = false;
      // console.log(this.reportContainer[0].policeStationID.userName)
    });
  }
  /* End get report list */
  getReportInfo(i: any) {
    this.reportRecord = [];
    this.reportRecord.push(this.reportContainer[i]);
  }

  fillterReport() {
    for (let i = 0; i < this.reportContainer.length; i++) {
      if (this.reportContainer[i].status == 'closed') {
        this.filterdContainer.push(this.reportContainer[i]);

      }




    }


  }


  // archive report


  archive(id: any) {
    console.log(id);
    this.load = true;

    this._ReportService.archive(id).subscribe(data => {
      console.log(data.message);


      if (data.message == "Report Closed successfully") {
        this.load = false;

        alert("Done");

        this.getreport();
        $("#exampleModal").modal("hide");
      } else {
        this.load = false;
        alert("fail Pleas Try Again");

      }
    });
  }
  activate(id: any) {
    console.log(id);
    this.load = true;

    this._ReportService.activate(id).subscribe(data => {
      console.log(data.message);


      if (data.message == "Report activeted successfully") {
        this.load = false;

        alert("Done");
        this.getreport();
        $("#exampleModal").modal("hide");

      } else {
        this.load = false;

        alert("fail Pleas Try Again");
      }
    });
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
    city: new FormControl('', [Validators.required]),
    stationName: new FormControl('', [Validators.required]),
    gender: new FormControl(``, [Validators.required]),
    image: new FormControl('', []),
    foundTime: new FormControl('', []),
    description: new FormControl('', [Validators.required]),
    finderName: new FormControl('', [Validators.required, Validators.pattern(/^[\u0621-\u064Aء-ئ][^#&<>\"~;$^%{}?]{2,500}$/)]),
    nationID: new FormControl('', [Validators.required, Validators.pattern(/(2|3)[0-9][1-9][0-1][1-9][0-3][1-9](01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)\d\d\d\d\d/)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}/)]),
    finderEmail: new FormControl('', [Validators.email, Validators.required])

  });

  getReportData() {
    console.log(this.reportRecord[0]);

    this.addMissing.controls.name.setValue(this.reportRecord[0].name)
    this.addMissing.controls.age.setValue(this.reportRecord[0].age)
    this.addMissing.controls.city.setValue(this.reportRecord[0].lostLocation)
    this.addMissing.controls.gender.setValue(this.reportRecord[0].gender)
    this.addMissing.controls.stationName.setValue(this.reportRecord[0].policeStationID.userName)
    this.addMissing.controls.foundTime.setValue(this.reportRecord[0].lostTime)
    this.addMissing.controls.description.setValue(this.reportRecord[0].description)
    this.addMissing.controls.finderName.setValue(this.reportRecord[0].reporterName)
    this.addMissing.controls.nationID.setValue(this.reportRecord[0].reporterNationID)
    this.addMissing.controls.phoneNumber.setValue( this.reportRecord[0].reporterPhone)
    this.addMissing.controls.finderEmail.setValue(this.reportRecord[0].reporterEmail)


  }
  handelEditReport(id: any) {
    console.log(id);

    $("#exampleModal").modal("hide");

    this.load2 = true;

    console.log(this.addMissing.controls.foundTime.value);
    console.log(this.addMissing.controls.description.value);


    if (this.addMissing.valid) {
      if (this.images == undefined) {
        this.images = this.reportRecord[0].imageURl
      }
      if (this.addMissing.controls.foundTime.value == undefined) {
        this.addMissing.controls.foundTime.setValue(this.reportRecord[0].lostTime)
        console.log(this.addMissing.controls.foundTime.value);

      }
      if (this.addMissing.controls.description.value == undefined) {
        this.addMissing.controls.description.setValue(this.reportRecord[0].description)
      }
      console.log(this.images);

      let formData = new FormData();
      formData.append("img", this.images);
      formData.append("name", this.addMissing.controls.name.value);
      formData.append("age", this.addMissing.controls.age.value);
      formData.append("gender", this.addMissing.controls.gender.value);
      formData.append("description", this.addMissing.controls.description.value);
      formData.append("lostLocation", this.addMissing.controls.city.value);
      formData.append("lostTime", this.addMissing.controls.foundTime.value);
      formData.append("reporterName", this.addMissing.controls.finderName.value);
      formData.append("reporterNationID", this.addMissing.controls.nationID.value);
      formData.append("reporterPhone", this.addMissing.controls.phoneNumber.value);
      formData.append("reporterEmail", this.addMissing.controls.finderEmail.value);
      formData.append("policeStationName", this.addMissing.controls.stationName.value);

      console.log(formData.get('img'));

      this._ReportService.editReportInfo(id, formData).subscribe(data => {
        console.log(data);

        if (data.message == "in-valid image") {
          this.load2 = false;

          alert("please enter img")
        } else if (data.message == "Done") {
          this.load2 = false;

          alert("updated Successfully");
          this.getreport();
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
