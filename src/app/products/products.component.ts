import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from './service/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  providers:[ProductsService,HttpClient],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  products: any[]=[];
  errorMessage:string='';

  constructor(
    private productService:ProductsService, 
    private route: ActivatedRoute,
    public cdr:ChangeDetectorRef,
    private router:Router
  ){}
  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    })
  }

  currentPage: number = 1;
  itemsPerPage: number = 8; 
  totalItems: number = 0;

  onePageData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.products.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  get totalPages():number {
    this.totalItems = this.products.length;
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  scrollToTop() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  addToCart() {
    if(localStorage.getItem('isLogged')) {
      console.log(100);
    }
    else {
      this.router.navigate(['login'])
    }
  }
}
