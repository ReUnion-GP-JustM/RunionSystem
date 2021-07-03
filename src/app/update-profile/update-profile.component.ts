import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomelessService } from '../homeless.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  images: any;
  responseData: any[] = [];
  load: boolean = false;
  result: boolean = false;
  notFound: boolean = false;
  addForm: boolean = false;
  searchForm: boolean = true;
  constructor(public _HomelessService:HomelessService) { }

  ngOnInit(): void {
  }
  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      console.log(this.images);

    }
  }


  //step one search in report before add to HomeLess
  //formData
  searchReport = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[\u0621-\u064Aء-ئ][^#&<>\"~;$^%{}?]{2,20}$/)]),
    age: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
    gender: new FormControl('male', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  })
  // api Method
  hadelSearchRport() {
    if (this.searchReport.valid) {
      this.load = true;
      const formData = new FormData();
      formData.append("img", this.images);
      formData.append("name", this.searchReport.controls.name.value);
      formData.append("endAge", this.searchReport.controls.age.value + 5);
      formData.append("startAge", this.searchReport.controls.age.value);
      formData.append("gender", this.searchReport.controls.gender.value);

      this._HomelessService.searchInHomeless(formData).subscribe(response => {
        if (response.message == "search Done") {
          this.load = false;
          this.result = true
          this.responseData = response.matchedResult;
          console.log(this.responseData.length);

          if (this.responseData.length == 0) {
            this.notFound = true

          }
        } else {
          alert("error")
        }
        console.log(this.responseData);

      })
    }
  }
}
