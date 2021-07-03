import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  lat = 29.986358540343307;
  lng = 31.26789936670175;
  link: any = "";
  constructor() { }

  ngOnInit(): void {
  }

  mapCoords(event: any) {
    console.log(event);
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.link = `https://www.google.com/maps/@${this.lat},${this.lng}z`
    console.log(this.link);


  }

}
