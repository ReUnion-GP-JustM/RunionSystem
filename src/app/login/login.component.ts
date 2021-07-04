import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service'
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  lat = 29.986358540343307;
  lng = 31.26789936670175;
  link: any = "";
  count: any = 0;
  errorMessage: boolean = false;
  emailGlobal: String = ''
  message: String = '';
  loginError: boolean = false;
  loginErrorMessage: any;
  load: boolean = false;

  constructor(private _UserService: UserService, public _Router: Router) {
    localStorage.clear();
  }
  backLogin() {
    $(".secondForm").fadeOut(500);
    $(".firstForm").delay(500).fadeIn();

  }
  ngOnInit(): void {
    $(".FFLink").click(function () {
      $(".firstForm").fadeOut(500);
      $(".secondForm").delay(500).fadeIn();
    })
    $(".submitEmali").click(function () {
      $(".secondForm").fadeOut(500);
      $(".thirdForm").delay(500).fadeIn();
    })
    $(".submitCode").click(function () {
      $(".thirdForm").fadeOut(500);
      $(".forthForm").delay(500).fadeIn();
    })
  }
  //map
  mapCoords(event: any) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.link = `https://www.google.com/maps/search/?api=1&query=${this.lat},${this.lng}`
    // console.log(this.link);

  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/), Validators.required])
  })

  forgetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required])

  })

  checkCodeForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    code: new FormControl('', [Validators.required])


  })
  // email, code, password, cPassword 
  activateForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    code: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/), Validators.required]),
    cPassword: new FormControl('', [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/), Validators.required])

  })


  handelSignIn() {

    this.load = true;
    let Data = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value,

    }

    this._UserService.signIn(Data).subscribe(data => {
      console.log(data.message);

      if (data.message == 'invalid data') {
        this.load = false;

        this.loginError = true;
        this.loginErrorMessage = "In-valid data please enter valid data";
      } else if (data.message == "Not register user") {
        this.load = false;

        this.loginError = true;
        this.loginErrorMessage = "This user is not registered please signUp first";

      } else if (data.message == "pinding for  admin Aprove") {
        this.load = false;

        this.loginError = true;
        this.loginErrorMessage = "Pinding for  admin approval";
      } else if (data.message == "u have  to confirm u email First") {
        this.load = false;

        this.loginError = true;
        this.loginErrorMessage = "Please confirm your email";
      } else if (data.message == "invalid Password") {
        this.load = false;

        this.loginError = true;
        this.loginErrorMessage = "Please enter the correct password";
      } else if (data.message == "loginSucess") {
        this.load = false;

        //set token localStorage
        localStorage.setItem('token', data.token);
        //redirect homePage
        this._Router.navigateByUrl("/admin")
        //Navigate DashBored
        this.loginForm.reset();
      } else {
        this.load = false;

        this.loginError = true;
        this.loginErrorMessage = "In-valid Data Please Enter Valid Data";
      }
    })
  }

  setForgetForm() {
    this.forgetPasswordForm.controls.email.setValue(this.loginForm.controls.email.value);
  }
  handelForgetPassword() {
    this.load = true;

    this.count = this.count + 1;
    console.log(this.count);

    let data = { email: this.forgetPasswordForm.controls.email.value }
    this._UserService.forgetPassword(data).subscribe(response => {
      console.log(response.message);
      if (response.message == 'in-valid user') {
        this.load = false;

        this.loginError = true;
        this.loginErrorMessage = "please Enter Valid Email";
      } else if (response.message == 'done') {

        this.checkCodeForm.controls.email.setValue(this.forgetPasswordForm.controls.email.value);
        $(".submitEmali").click(function () {
          $(".secondForm").fadeOut(500);
          $(".thirdForm").delay(500).fadeIn();
        })


        if (this.count > 1) {
          this.loginError = true;
          this.loginErrorMessage = "Please check your email for the new activation  code";
        } else {
          this.loginError = true;
          this.loginErrorMessage = "Please Check you email for activation code";
        }

        this.load = false;

      } else {

        this.loginError = true;
        this.loginErrorMessage = "Please enter valid data";
        this.load = false;

      }

    })
  }

  handelCheckCode() {
    this.load = true;

    let data = {
      email: this.checkCodeForm.controls.email.value,
      code: this.checkCodeForm.controls.code.value
    }
    this._UserService.checkCode(data).subscribe(response => {
      console.log(response.message);
      if (response.message == 'invalid code') {

        this.loginError = true;
        this.loginErrorMessage = "In-valid code please re-enter the code";
        this.load = false;

      } else if (response.message == 'matched code') {

        this.activateForm.controls.email.setValue(this.checkCodeForm.controls.email.value);
        this.activateForm.controls.code.setValue(this.checkCodeForm.controls.code.value);
        $(".submitCode").click(function () {
          $(".thirdForm").fadeOut(500);
          $(".forthForm").delay(500).fadeIn();
        })
        this.loginError = false;
        this.loginErrorMessage;
        this.load = false;


      } else if (response.message = "invalid user") {
        this.loginError = true;
        this.loginErrorMessage = "Please enter valid email";
        this.load = false;

      } else {
        this.loginError = true;
        this.loginErrorMessage = "Please enter valid data";
        this.load = false;

      }

    })
  }




  activateForgetPasswordForm() {
    this.load = true;

    let data = {
      email: this.activateForm.controls.email.value,
      code: this.activateForm.controls.code.value,
      password: this.activateForm.controls.password.value,
      cPassword: this.activateForm.controls.cPassword.value,

    }

    this._UserService.confirmActivateCode(data).subscribe(response => {
      console.log(response.message);
      if (response.message == 'invalid code') {
        this.loginError = true;
        this.loginErrorMessage = "In-valid code";
        this.load = false;

      } else if (response.message == 'password updated Successfully') {

        this.loginError = true;
        this.loginErrorMessage = "Password updated successfully";
        $(".forthForm").fadeOut(500);
        $(".firstForm").delay(500).fadeIn();
        this.load = false;


      } else if (response.message == 'invalid user') {

        this.loginError = true;
        this.loginErrorMessage = "Please enter valid email ";
        this.load = false;

      } else {
        this.loginError = true;
        this.loginErrorMessage = "Please enter valid data ";
        this.load = false;

      }

    })
  }




}
