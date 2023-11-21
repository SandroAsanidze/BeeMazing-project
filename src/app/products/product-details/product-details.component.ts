import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../service/products.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  providers:[ProductsService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  singleProduct:any;
  currentPath:string|undefined;
  today:Date = new Date();

  constructor(
    private productService:ProductsService,
    private router:Router,
    private route:ActivatedRoute,
    private formBuilder:FormBuilder
  ){}
  ngOnInit(): void {
    const route = this.router.url;
    const segments = route.split('/');
    const id = Number(segments[segments.length - 1]);
    
    this.currentPath = segments[1];

    this.productService.getSingleProduct(id).subscribe(data => {
      this.singleProduct = data;
    })

    this.route.data.subscribe((m:any) => {
      this.singleProduct = m.resolveDetails;
    })
  }


  backToPage() {
    this.router.navigate([this.currentPath]);
  }


  public paymentForm = this.formBuilder.group({
    name:['',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
    cardNumber:['',[Validators.required]],
    expiry:['',[Validators.required]],
    cvc:['',[Validators.required]]
  })

  Submit() {
    this.paymentForm.reset();
    const alertion = alert('Successfull Payment');
    this.router.navigate(['products'])
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
