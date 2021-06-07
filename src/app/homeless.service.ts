import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable , from} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class HomelessService {
   baseURL =`https://runiongpsystem.herokuapp.com/`
  constructor(private _HttpClient:HttpClient) { }
  seachINReport(data:any):Observable<any>{
    return this._HttpClient.get(this.baseURL+`searchInReportBeforAddInHomeLess`, data);
  }
}
