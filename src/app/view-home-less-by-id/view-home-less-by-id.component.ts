import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomelessService } from '../homeless.service';
import { SuperAdminPrivalgesService } from '../super-admin-privalges.service';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router'
declare var $: any;

@Component({
  selector: 'app-view-home-less-by-id',
  templateUrl: './view-home-less-by-id.component.html',
  styleUrls: ['./view-home-less-by-id.component.scss']
})
export class ViewHomeLessByIDComponent implements OnInit {

  homelessList: any;
  // filterdContainer: any[] = [];
  // homelessRecord: any[] = [];
  load2: boolean = false;
  load: boolean = true;

  
  constructor(public _HomelessService: HomelessService,public _ActivatedRoute: ActivatedRoute) {
 

     this.getHomelessByID() 

  }


  ngOnInit(): void {
  }

  getHomelessByID() {
    let id =   this._ActivatedRoute.snapshot.paramMap.get('id');

    this._HomelessService.getAllHomelessByID(id).subscribe(response => {
      if (response.message == 'found') {
        this.homelessList = response.homless;
        this.load = false;
        console.log(this.homelessList);

      } else {
        this.load = false;
        console.log("fail");

      }
    })
  }



  // homelessDetails(i: any) {
  //   console.log(i);
  //   for (let index = 0; index < this.homelessList.length; index++) {
  //     if (this.homelessList[index]._id == i) {
  //       this.homelessRecord = [];
  //       this.homelessRecord.push(this.homelessList[index]);
  //     }

  //   }


  // }







}
