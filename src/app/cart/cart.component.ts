import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './service/cart.service';
import { Router } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,PaymentComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  products: any[]=[];
  grandTotal:number = 0;

  constructor(private cartService:CartService,private router:Router,private formBuilder:FormBuilder){}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(data => {
      this.products = data;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }

  removeProduct(product:any) {
    this.cartService.removeCartItem(product)
  }

  emptyCart() {
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
