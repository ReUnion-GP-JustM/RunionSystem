import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable , from} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(private _HttpClient:HttpClient) { 

  }

  getReport():Observable<any>{
    return this._HttpClient.get("http://newsapi.org/v2/everything?q=tesla&from=2021-01-15&sortBy=publishedAt&apiKey=a64873e5a34e4b8ea3b63bc8032ef4a8");
  }
}
