import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { HomelessService } from '../homeless.service';
import { UserService } from '../user.service';
declare var $: any;
@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.scss']
})
export class SuperAdminComponent implements OnInit {
  load: boolean = false;
  dash: boolean = true;
  collapase: boolean[] = [true, true, true, true, true];
  displayoption: String = "";
  //timeout:number=200;
  userName: String = '';
  userRole: String = '';
  userID: String = '';
  decoded: any;
  profImage: any;
  userLocation: any
  homebtn(){
  //  this._Router.navigateByUrl('/admin');
  this.dash = true
  this.displayoption =""
  }
  constructor(private el: ElementRef, private _UserService: UserService, public _Router: Router) {
    let token = localStorage.getItem('token');
    this.decoded = jwt_decode(`${token}`);
    console.log(this.decoded);
    this.userName = this.decoded.userName;
    this.userID = this.decoded.userID;
    this.userRole = this.decoded.userRole;
    this.profImage = this.decoded.imag;
    this.userLocation = this.decoded.location;

    this.updateInfo.controls.userName.setValue(this.userName);
    this.updateInfo.controls.location.setValue(this.userLocation);




  }

  ngOnInit(): void {

    $(".open").click(function () {
      $(".open").hide(1000);
      $(".close").show(1000);
      $(".rightPart").animate({ right: "0" }, 1000);
      $(".ll").animate({ left: "0" }, 1000);

    })
    $(".close , .ll  ").click(function () {
      $(".open").show(1000);
      $(".close").hide(1000);
      $(".rightPart").animate({ right: "-150%" }, 1000);
      $(".ll").animate({ left: "-100%" }, 1000);

      // $(".leftPart").animate({width:"100%"},1000);
    })

    // $(".open").click(function () {
    //   $(".open").hide(1000);
    //   $(".close").show(1000);
    //   $(".rightPart").animate({right:"0"},1000);
    //   let screenWidth =  $( document ).width();
    //   console.log(screenWidth);
    //   if(screenWidth>=10001  && screenWidth<=1350 ){
    //     $(".leftPart").animate({width:"75%"},1000);
    //   }
    //   else if(screenWidth>=601 && screenWidth<=1000){
    //     $(".leftPart").animate({width:"60%"},1000);
    //   }else if(screenWidth<=600){
    //     $(".leftPart").animate({width:"50%"},1000);
    //   }else{
    //   $(".leftPart").animate({width:"79%"},1000);
    //   }
    // })

  }
  changeArrow(index: number) {
    setTimeout(() => {
      setTimeout(() => {
        this.collapase[index] = !this.collapase[index];
        for (let i = 0; i < this.collapase.length; i++) {
          if (i != index) {
            this.collapase[i] = true;
          }
        }
      }, 100);
    }, 200);


  }
  changeAsideNav(displyOptionName: String) {
    this.dash = false;
    this.displayoption = displyOptionName;
    $(".open").show(1000);
    $(".close").hide(1000);
    $(".rightPart").animate({ right: "-150%" }, 1000);
    $(".ll").animate({ left: "-100%" }, 1000);

  }
  changeAsideNavTwo(data: any) {
    console.log(data);

    if (data == 'password') {
      $("#imageModal").modal("hide");
      $("#mapModal").modal("hide");
      $("#updateuserInfoModal").modal("hide");

      $("#updatePassword").modal("show");

    } else if (data == "img") {
      $("#updatePassword").modal("hide");
      $("#mapModal").modal("hide");
      $("#updateuserInfoModal").modal("hide");
      $("#imageModal").modal("show");

    }else if(data == 'userNameandLocation'){
      $("#updatePassword").modal("hide");
      $("#imageModal").modal("hide");
      $("#mapModal").modal("hide");
      $("#updateuserInfoModal").modal("show");

    }
    $(".open").show(1000);
    $(".close").hide(1000);
    $(".rightPart").animate({ right: "-150%" }, 1000);
    $(".ll").animate({ left: "-100%" }, 1000);
  }
  signOut() {
    this._UserService.logout();
  }








  images: any;
  responseData: any[] = [];
  result: boolean = false;
  notFound: boolean = false;
  addForm: boolean = false;
  searchForm: boolean = true;


  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      console.log(this.images);

    }
  }


  //step one search in report before add to HomeLess
  //formData
  updatePasswordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
    newPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
    cNewPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
  })
  // api Method
  handelUpdatePassword() {
    if (this.updatePasswordForm.valid) {
      this.load = true;
      const formData = new FormData();
      formData.append("oldPassword", this.updatePasswordForm.controls.oldPassword.value);
      formData.append("password", this.updatePasswordForm.controls.newPassword.value);
      formData.append("cPassword", this.updatePasswordForm.controls.cNewPassword.value);

      this._UserService.updatePassword(formData).subscribe(response => {
        if (response.message == "password updated Successfully") {
          this.load = false;
          alert("Done");
          $("#updatePassword").modal("hide");
          this.updatePasswordForm.reset();
          localStorage.clear();
          this._Router.navigateByUrl("");


        } else if (response.message == "wrong old Password") {
          alert("wrong old Password");
        } else if (response.message == "in-valid user") {
          alert("in-valid user");
          localStorage.clear();

          this._Router.navigateByUrl("");

        } else {
          alert("fail please try again")
        }

      })
    }
  }

  //formData
  uploadImg = new FormGroup({
    img: new FormControl('', [Validators.required])
  })

  handeluploadImg() {
    if (this.uploadImg.valid) {
      this.load = true;
      const formData = new FormData();
      formData.append("img", this.images);

      this._UserService.updateImage(formData).subscribe(data => {
        if (data.message == "in-valid image") {
          alert("in-valid image please try again");
          this.load = false;

        } else if (data.message == 'password updated Successfully') {

          alert("Done");
          $("#imageModal").modal("hide");
          localStorage.setItem('token',data.token);
          this.profImage = data.imageURl;
          this.load = false;
    
          this.uploadImg.reset();

        }
        else if (data.message == 'in-valid user') {

          alert("in-valid user");
          $("#imageModal").modal("hide");
          this.load = false;
          this.uploadImg.reset();
          localStorage.clear();
          this._Router.navigateByUrl("");



        } else {
          this.load = false;
          alert("in-valid Data");

        }
      })
    } else {

      alert("fail please try again")
    }
  }


  //update userName and location
  lat = 29.986358540343307;
  lng = 31.26789936670175;
  link: any = "";
  mapCoords(event: any) {
    console.log(event);
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.link = `https://www.google.com/maps/search/?api=1&query=${this.lat},${this.lng}`
    this.updateInfo.controls.location.setValue(this.link);
    console.log(this.link);


  }
  updateInfo = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.pattern(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)]),
    location: new FormControl('', [Validators.required])
  })

  handelUpdateInfo() {

this.load = true;
    console.log(this.link.length)

    if (this.link.length == 0 || !this.updateInfo.valid) {
        this.link = this.userLocation;
    } else {

      let Data = {
        userName: this.updateInfo.controls.userName.value,
        location: this.link
      }

      this._UserService.updateUserNameAndLocation(Data).subscribe(data => {
        console.log(data.message);
        
        if (data.message == "Updated successfully") {
          alert("Updated successfully");
          $("#mapModal").modal("hide");
          $("#updateuserInfoModal").modal("hide");
          localStorage.setItem('token',data.token);
          this.updateInfo.controls.userName.setValue(data.info.userName);
          this.updateInfo.controls.location.setValue(data.info.location);
          this.userName =data.info.userName
          this.load = false;


        } else if(data.message == "in-valid user") {
          // alert("Fail please  try agin");
          this._Router.navigateByUrl('');
          this.load = false;

        }else if(data.message == "validation error") {
          alert("In-valid data please enter valid data");
          this.load = false;

        }else{
          alert("Some thing wrong please try again")
          this.load = false;

        }
      })
    }
  }

}
