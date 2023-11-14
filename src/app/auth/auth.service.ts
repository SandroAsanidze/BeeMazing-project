import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

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
}
