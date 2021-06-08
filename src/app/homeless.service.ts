import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable , from} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class HomelessService {
   baseURL =`http://localhost:3000/`;

  constructor(private _HttpClient:HttpClient) { }
  seachINReport(formData:any):Observable<any>{
   
    let token = localStorage.getItem('token');
    console.log(token);
    
    return this._HttpClient.post(this.baseURL+`searchInReportBeforAddInHomeLess`,formData,{
      headers: new HttpHeaders({
        'token':`${token}`,
      })
    });
  }
}
