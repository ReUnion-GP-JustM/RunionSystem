import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
declare var $: any
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUSComponent implements OnInit {
  load: boolean = false;
  constructor(public _UserService: UserService) { }

  ngOnInit(): void {
    $(".noJq1").click(function () {
      $(".myhidden1").slideToggle(300);
      $(".myhidden2").slideUp(300);
      $(".myhidden3").slideUp(300);
      $(".myhidden4").slideUp(300);
      $(".myhidden5").slideUp(300);
    })
    $(".noJq2").click(function () {
      $(".myhidden2").slideToggle(300);
      $(".myhidden1").slideUp(300);
      $(".myhidden3").slideUp(300);
      $(".myhidden4").slideUp(300);
      $(".myhidden5").slideUp(300);
    })
    $(".noJq3").click(function () {
      $(".myhidden3").slideToggle(300);
      $(".myhidden2").slideUp(300);
      $(".myhidden1").slideUp(300);
      $(".myhidden4").slideUp(300);
      $(".myhidden5").slideUp(300);
    })
    $(".noJq4").click(function () {
      $(".myhidden4").slideToggle(300);
      $(".myhidden2").slideUp(300);
      $(".myhidden3").slideUp(300);
      $(".myhidden1").slideUp(300);
      $(".myhidden5").slideUp(300);
    })
    $(".noJq5").click(function () {
      $(".myhidden5").slideToggle(300);
      $(".myhidden2").slideUp(300);
      $(".myhidden3").slideUp(300);
      $(".myhidden4").slideUp(300);
      $(".myhidden1").slideUp(300);
    })
  }
  feedForm = new FormGroup({
    name:new FormControl('',[Validators.required]),
    title:new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required])
  })

  handelfeedBack() {
    
    // console.log(this.feedForm.value);

    if (this.feedForm.valid) {
      this.load = true;

      this._UserService.feedBack(this.feedForm.value).subscribe(data => {
        if (data.message == 'Done') {
              this.load=false;
              alert("تم ارسال سؤالك  بنجاح ");
              this.feedForm.reset();
        }
      })
    }else{
      alert('In-valid data')
    }
  }
}
