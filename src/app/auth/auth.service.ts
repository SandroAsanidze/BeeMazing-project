import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  hideEverything:boolean = false;

  private _url:string='http://localhost:3000/information'

  public getInfo():Observable<any> {
    return this.http.get<any>(this._url);
  }

  public addCustomer(info:any):Observable<any> {
    return this.http.post<any>(this._url,info)
  }

  public deleteCustomer(id:any):Observable<any>{
    return this.http.delete(`${this._url}/${id}`);
  }
}
