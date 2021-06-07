import { Component, ElementRef, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.scss']
})
export class SuperAdminComponent implements OnInit {
   
   collapase:boolean[]=[true,true,true,true,true];
   displayoption:String="addMissing";
   //timeout:number=200;
  constructor(private el:ElementRef) { 
   
  }

  ngOnInit(): void {

    $(".open").click(function () {
      $(".open").hide(1000);
      $(".close").show(1000);
      $(".rightPart").animate({right:"0"},1000);
      let screenWidth =  $( document ).width();
      console.log(screenWidth);
      if(screenWidth>=10001  && screenWidth<=1350 ){
        $(".leftPart").animate({width:"75%"},1000);
      }
      else if(screenWidth>=601 && screenWidth<=1000){
        $(".leftPart").animate({width:"62%"},1000);
      }else if(screenWidth<=600){
        $(".leftPart").animate({width:"60%"},1000);
      }else{
      $(".leftPart").animate({width:"79%"},1000);
      }
    })
    $(".close").click(function () {
      $(".open").show(1000);
      $(".close").hide(1000);
      $(".rightPart").animate({right:"-40%"},1000);
      $(".leftPart").animate({width:"100%"},1000);
    })
  }
  changeArrow(index:number){
    setTimeout(() => {
        setTimeout(() => {
      this.collapase[index] =! this.collapase[index];
      for(let i=0 ;i<this.collapase.length;i++){
        if(i !=index){
          this.collapase[i]=true;
        }
      }
    },100);
    }, 200);
  
    
  }
  changeAsideNav(displyOptionName:String){
    this.displayoption=displyOptionName;
    console.log(displyOptionName);
    
   }
}
