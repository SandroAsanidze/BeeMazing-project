import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../service/products.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,RouterModule],
  providers:[ProductsService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  singleProduct:any;
  currentPath:string|undefined;

  constructor(
    private productService:ProductsService,
    private router:Router,
  ){}
  ngOnInit(): void {
    const route = this.router.url;
    const segments = route.split('/');
    const id = Number(segments[segments.length - 1]);
    
    this.currentPath = segments[1];

    this.productService.getSingleProduct(id).subscribe(data => {
      this.singleProduct = data;
    })
  }


  backToPage() {
    this.router.navigate([this.currentPath]);
  }
}
