import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _url = 'http://localhost:3000/products';

  constructor(private http:HttpClient,private router:Router) {}

  public getProducts():Observable<any[]> {
    return this.http.get<any[]>(this._url);
  }

  public getSingleProduct(id:number):Observable<any> {
    return this.http.get<any>(`${this._url}/${id}`);
  }
}
