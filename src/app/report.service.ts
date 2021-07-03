import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable , from} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ReportService {

  
baseURL = `http://localhost:3000/`;
// baseURL =`https://runiongpsystem.herokuapp.com/`;
  constructor(private _HttpClient:HttpClient) { 

  }

  addReport(data:any):Observable<any>{
    return this._HttpClient.post(this.baseURL+'addReport',data);
  }
 
  getReport(): Observable<any> {
    let token = localStorage.getItem('token');
    console.log(token);
    return this._HttpClient.get(this.baseURL + "viewReports", {
      headers: new HttpHeaders({
        'token': `${token}`,
      })
    });
  }


archive(id:any): Observable<any> {
    let token = localStorage.getItem('token');
    console.log(token);
    return this._HttpClient.get(this.baseURL + `closeReport/${id}`, {
      headers: new HttpHeaders({
        'token': `${token}`,
      })
    });
  }


activate(id:any): Observable<any> {
    let token = localStorage.getItem('token');
    console.log(token);
    return this._HttpClient.get(this.baseURL + `activateReport/${id}`, {
      headers: new HttpHeaders({
        'token': `${token}`,
      })
    });
  }

 editReportInfo(id:any , data:any) :Observable<any> {
  let token = localStorage.getItem('token');
  console.log(token);
  return this._HttpClient.post(this.baseURL + `updaterReport/${id}`,data, {
    headers: new HttpHeaders({
      'token': `${token}`,
    })
  });
 }

}
