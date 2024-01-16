import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../shared/services/cart-service/cart.service';
import { Router } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentComponent } from '../payment/payment.component';
import { json } from 'stream/consumers';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,PaymentComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  products: any[]=[];

  constructor(private cartService:CartService,private router:Router,private formBuilder:FormBuilder){}

  ngOnInit(): void {
    this.products = this.cartService.cartItemList;
  }

  totalPrice() {
    let grandTotal=0;
    this.products.map((product: any) => {
      const totalPerProduct = product.price * product.quantity;
      grandTotal += totalPerProduct;
    });
    return grandTotal;
  }

  removeProduct(product:any) {
    this.cartService.removeCartItem(product)
  }

  incrementQuantity(id:number) {
    this.cartService.incrementQuantity(id);
  }

  decrementQuantity(id:number) {
    this.cartService.decrementQuantity(id);
  }

  emptyCart() {
    this.products = [];
    this.cartService.removeAllCart();
  }

  returnToShop() {
    this.router.navigate(['products']);
  }
  
  openModal(){
    const modelDiv = document.getElementById('buyModal');
    if(modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }
}
