import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class HomelessService {
  baseURL = `http://localhost:3000/`;
  //  baseURL =`https://runiongpsystem.herokuapp.com/`;


  constructor(private _HttpClient: HttpClient) { }
  searchInHomeless(formData: any): Observable<any> {

    return this._HttpClient.post(this.baseURL + `searchInHomeless`, formData);
  }
  
  seachINReport(formData: any): Observable<any> {

    let token = localStorage.getItem('token');
    console.log(token);

    return this._HttpClient.post(this.baseURL + `searchInReportBeforAddInHomeLess`, formData, {
      headers: new HttpHeaders({
        'token': `${token}`,
      })
    });
  }
  communcateWithParents(formData: any, id: any): Observable<any> {

    let token = localStorage.getItem('token');
    console.log(token);

    return this._HttpClient.post(this.baseURL + `communicateToParentofHomless/${id}`, formData, {
      headers: new HttpHeaders({
        'token': `${token}`,
      })
    });
  }
  addHomeless(formData: any): Observable<any> {

    let token = localStorage.getItem('token');
    console.log(token);

    return this._HttpClient.post(this.baseURL + `addHomeless`, formData, {
      headers: new HttpHeaders({
        'token': `${token}`,
      })
    });
  }


  getAllHomeless(): Observable<any> {
    let token = localStorage.getItem('token');
    console.log(token);
    // return this._HttpClient.post(this.baseURL+'getUserNotes',data)
    return this._HttpClient.get(this.baseURL + "viewAllHomeless", {
      headers: new HttpHeaders({
        'token': `${token}`,
      })
    });
  }
  getshelterHomeless(): Observable<any> {
    let token = localStorage.getItem('token');
    console.log(token);
    // return this._HttpClient.post(this.baseURL+'getUserNotes',data)
    return this._HttpClient.get(this.baseURL + "viewAllShelterHomeless", {
      headers: new HttpHeaders({
        'token': `${token}`,
      })
    });
  }
  closeHomeless(id: any): Observable<any> {
    let token = localStorage.getItem('token');
    console.log(token);
    console.log(id);

    return this._HttpClient.get(this.baseURL + `closeHomless/${id}`, {
      headers: new HttpHeaders({
        'token': `${token}`,
      })
    });
  }
  undifinedHomeless(id: any): Observable<any> {
    let token = localStorage.getItem('token');
    console.log(token);
    console.log(id);

    return this._HttpClient.get(this.baseURL + `undifinedHomless/${id}`, {
      headers: new HttpHeaders({
        'token': `${token}`,
      })
    });
  }


  edithomelessInfo(id:any , data:any) :Observable<any> {
    let token = localStorage.getItem('token');
    console.log(token);
    return this._HttpClient.post(this.baseURL + `updaterhomeless/${id}`,data, {
      headers: new HttpHeaders({
        'token': `${token}`,
      })
    });
   }

  getAllHomelessByID(id:any): Observable<any> {
    return this._HttpClient.get(this.baseURL + `seachHomelessByIDEmail/${id}`);
  }


}
