import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../service/products.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from '../../payment/payment.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule,PaymentComponent],
  providers:[ProductsService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  singleProduct:any;
  currentPath:string|undefined;
  today:Date = new Date();
  @Input() grandTotal:number=0


  constructor(
    private productService:ProductsService,
    private router:Router,
    private route:ActivatedRoute,
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

  openModal(){
    const modelDiv = document.getElementById('buyModal');
    if(modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }
}
