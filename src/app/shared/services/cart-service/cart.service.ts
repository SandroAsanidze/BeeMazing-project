import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any[] = JSON.parse(localStorage.getItem('items') || '[]');
  public productList = new BehaviorSubject<any>(this.cartItemList);
  constructor() { }

  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
  }

  addToCart(product : any) {
    const findId = this.cartItemList.find((i) => i.id === product.id)
    if(findId) {
      product.quantity++;
    }
    else {
      this.cartItemList.push(product);
      localStorage.setItem('items',JSON.stringify(this.cartItemList))
      this.productList.next([...this.cartItemList]);

      this.getTotalPrice();
    }
  }

  getTotalPrice():number {
    let grandTotal = 0;
    this.cartItemList.map((a:any) => {
      grandTotal += a.total
    })
    
    return grandTotal;
  }


  incrementQuantity(id:number) {
    let product = this.cartItemList.find((i)=> i.id === id);
    
    if(product) {
      product.quantity++;
      localStorage.setItem('items',JSON.stringify(this.cartItemList))
      this.productList.next([...this.cartItemList]);
    }
  }

  decrementQuantity(id:number) {
    let product = this.cartItemList.find((i)=> i.id === id);
    
    if(product && product.quantity > 1) {
      product.quantity--;
      localStorage.setItem('items',JSON.stringify(this.cartItemList))
      this.productList.next([...this.cartItemList]);
    }
  }


  removeCartItem(product : any) {
    this.cartItemList.map((a:any,index:any) => {
      if(product.id === a.id) {
        this.cartItemList.splice(index,1);
        localStorage.setItem('items',JSON.stringify(this.cartItemList))
        this.productList.next([...this.cartItemList]);
      }
    })
  }

  removeAllCart() {
    this.cartItemList = [];
    localStorage.setItem('items','[]')
    this.productList.next([...this.cartItemList]);
  }
}
