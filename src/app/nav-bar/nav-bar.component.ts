import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  tokenUser:boolean=false;
  decoded:any;
  constructor() {
    let token = localStorage.getItem('token');
    this.decoded = jwt_decode(`${token}`);
    if (this.decoded.userRole == 'superAdmin' || this.decoded.userRole == 'policeStation' ||this.decoded.userRole == 'shelter'){
   this.tokenUser=true;
    }
   }

  ngOnInit(): void {

  }

}
