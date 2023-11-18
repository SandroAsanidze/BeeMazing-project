import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './service/cart.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
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

  public paymentForm = this.formBuilder.group({
    name:['',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
    cardNumber:['',[Validators.required]],
    expiry:['',[Validators.required]],
    cvc:['',[Validators.required]]
  })

  Submit() {
    this.paymentForm.reset();
    this.emptyCart();
    const alertion = alert('Successfull Payment');
  }

  openModal(){
    const modelDiv = document.getElementById('buyModal');
    if(modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  closeModal(){
    const modelDiv = document.getElementById('buyModal');
    if(modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

}
