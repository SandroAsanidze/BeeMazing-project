import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../shared/services/cart-service/cart.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {

  constructor(private cartService:CartService,private formBuilder:FormBuilder,private cartComponent:CartComponent){}
  ngOnInit(): void {}
  
  public paymentForm = this.formBuilder.group({
    name:['',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
    cardNumber:['',[Validators.required]],
    expiry:['',[Validators.required]],
    cvc:['',[Validators.required]]
  })

  emptyCart() {
    this.cartComponent.products=[];
    this.cartService.removeAllCart();
  }

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
