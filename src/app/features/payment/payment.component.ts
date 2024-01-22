import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../shared/services/cart-service/cart.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartComponent } from '../cart/cart.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,SweetAlert2Module],
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

  async Submit() {
    this.paymentForm.reset();
    const swal = Swal.fire("Awesome!","Successfull Payment.","success")
    if(await swal) {
      this.emptyCart();
    }
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
