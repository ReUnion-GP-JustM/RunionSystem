import { Component, OnInit } from '@angular/core';
import { HomelessService } from '../homeless.service';

@Component({
  selector: 'app-shelter-home-less-history',
  templateUrl: './shelter-home-less-history.component.html',
  styleUrls: ['./shelter-home-less-history.component.scss']
})
export class ShelterHomeLessHistoryComponent implements OnInit {
  homelessList: any[] = [];
  filterdContainer: any[] = [];
  homelessRecord: any[] = [];
  load2:boolean=false;
  load: boolean = true;


  constructor(public _HomelessService: HomelessService) {

    this.getAllHomeless()

  }

  ngOnInit(): void {
  }
  getAllHomeless() {
    this._HomelessService.getshelterHomeless().subscribe(response => {
      if (response.message == 'Done') {
        this.homelessList = response.residentList;
        this.load = false;
        this.filterDataContainer();
        console.log(  this.homelessList);
        
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
          if(this.homelessList[index]._id == i){
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


}
