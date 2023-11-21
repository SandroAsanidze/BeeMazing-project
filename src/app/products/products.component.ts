import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from './service/products.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { CartService } from '../cart/service/cart.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,HttpClientModule,ReactiveFormsModule,RouterModule,FormsModule],
  providers:[ProductsService,HttpClient],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  products: any[]=[];
  errorMessage:string='';
  isLogged:boolean=false;


  constructor(
    private productService:ProductsService, 
    public cdr:ChangeDetectorRef,
    private cartService:CartService,
    private formBuilder:FormBuilder,
    private route:ActivatedRoute
  ){}

  filteredProducts:any[]=[];
  searchTerm:string ='';
  selectedCategory: string='';
  
  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;

      this.products.forEach((a:any) => {
        Object.assign(a,{quantity:1,total:a.price})
      })
    })
    
    const isLogged = localStorage.getItem('isLogged');
    if(isLogged === 'true'){
      this.isLogged = true;
    }
    
    // this.route.data.subscribe((m:any) => {
    //   this.products = m.resolveProducts;
    // })
  }

  search() {
    this.filterProducts();
  }

  filterByCategory() {
    this.filterProducts();
  }

  private filterProducts() {
      this.filteredProducts = this.products.filter(product => {
          const matchesSearchTerm = !this.searchTerm || product.title.toLowerCase().includes(this.searchTerm.toLowerCase());
          const matchesCategory = !this.selectedCategory || product.category === this.selectedCategory;

          return matchesSearchTerm && matchesCategory;
      });
  }

  public paymentForm = this.formBuilder.group({
    name:['',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
    cardNumber:['',[Validators.required]],
    expiry:['',[Validators.required]],
    cvc:['',[Validators.required]]
  })

  Submit() {
    const alertion = alert('Successfull Payment');
    this.paymentForm.reset();
  }

  currentPage: number = 1;
  itemsPerPage: number = 8; 
  totalItems: number = 0;

  onePageData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredProducts.slice(startIndex, endIndex);
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
    this.totalItems = this.filteredProducts.length;
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

  addToCart(product:any) {
    if(localStorage.getItem('isLogged')) {
      this.cartService.addToCart(product);
    }
    else {
      const information = alert('You must be logged into your account');
    }
  }
  productTitle:string ='';

  openModal(product:any){
    const modelDiv = document.getElementById('buyModal');
    if(modelDiv != null) {
      modelDiv.style.display = 'block';
    }

    localStorage.setItem('product',product.title);
    this.productTitle = localStorage.getItem('product') || '';
    
  }

  closeModal(){
    const modelDiv = document.getElementById('buyModal');
    if(modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }
}
