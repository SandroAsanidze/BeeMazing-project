import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth-service/auth.service';
import { ProductsService } from '../../shared/services/products-service/products.service';
import { CartService } from '../../shared/services/cart-service/cart.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule,SweetAlert2Module],
  providers:[ProductsService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit  {

  @HostListener('document:click',['$event'])
  onClick(event:any){
    const el = document.querySelector('.dropdown-container');
    
    if((event.target as HTMLElement).classList.contains('dropdown')) {
      this.showDropdown = false;
    }
    else {
      if(el && !el.contains(event.target as Node) && this.showDropdown) {
        this.showDropdown = false;
      }
    }
  }

  
  isScrolled = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    this.isScrolled = window.scrollY > 0;
  }
    constructor(
      private router:Router,
      public authService:AuthService,
      public productService:ProductsService,
      public cartService:CartService,
      private formBuilder:FormBuilder,
      private cdr:ChangeDetectorRef,
      private cookie:CookieService
    ){}
    name:string ='';
    id:string='';
    totalItem : number = 0;
    ngOnInit(): void {
      this.id = localStorage.getItem('id') || '';
      this.name = localStorage.getItem('name') || '';
      
      this.cartService.getProducts().subscribe(products => {
        this.totalItem = products.length;
      });
    }

    public checkIsLogged() {
      if(localStorage.getItem('isLogged') === 'true') {
        return true;
      }
      else {
        return false;
      }
    }

    loading: boolean = false;
    public logOut(){
        this.loading = true;
        this.showDropdown = false;
        this.warningMessage = '';
        setTimeout(() => {
          localStorage.removeItem('isLogged');
          localStorage.removeItem('name');
          localStorage.removeItem('id');
          this.scrollToTop();
          this.router.navigate(['home'])
          this.loading = false;
          this.cartService.removeAllCart();
          this.cartService.cartItemList=[];
        }, 2000);
    }

    showDropdown:boolean = false;

    public toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    }


    public deleteAccount(id:any) {
        const confirmation = confirm('Are you sure you want to Delete Account?');
        if (confirmation) {
          this.authService.deleteCustomer(id).subscribe();
          this.router.navigate(['home'])
          localStorage.removeItem('isLogged');
          localStorage.removeItem('name');
          this.showDropdown = false;
        }
    }

    scrollToBottom() {
      this.router.navigate(['home']);
      setTimeout(() => {
        window.scroll({ top: 1000, left: 0, behavior: 'smooth' });
      }, 50);
    }
    scrollToTop() {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }


    openModal(){
      const modelDiv = document.getElementById('myModal');
      if(modelDiv != null) {
        modelDiv.style.display = 'block';
      }
    }
  
    closeModal(){
      const modelDiv = document.getElementById('myModal');
      if(modelDiv != null) {
        modelDiv.style.display = 'none';
      }
    }


    public loginForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })

    warningMessage:string=''

    onSubmit(){
      this.authService.getInfo().subscribe(
        (data) => {
          data.forEach((item: { firstName:string;email: string; password: string;id:any }) => {
            if(this.loginForm.get('email')?.value === item.email && this.loginForm.get('password')?.value === item.password) {

              localStorage.setItem('isLogged','true');
              localStorage.setItem('name',item.firstName);
              localStorage.setItem('id',item.id);

              this.loginForm.reset();
              this.router.navigate(['home']);

              this.scrollToTop();
              this.name = item.firstName;
              this.warningMessage = '';
            }
            else {
              this.warningMessage = 'Invalid Email or Password';
            }
          });
        })
    }


    createAcc() {
      let modelDiv = document.getElementById('myModal')?.style.display;
      modelDiv = 'none';
      this.router.navigate(['registration'])
    }


  isExpanded$: boolean = false;

  open() {
    this.isExpanded$ = !this.isExpanded$;
  }

  showPassword = false;

  changeType() {
    this.showPassword = !this.showPassword;
  }

}
