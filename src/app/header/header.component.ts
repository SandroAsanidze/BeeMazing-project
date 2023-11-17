import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';
import { ProductsService } from '../products/service/products.service';
import { CartService } from '../cart/service/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
  providers:[ProductsService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
    constructor(
      private router:Router,
      public authService:AuthService,
      public productService:ProductsService,
      public cartService:CartService
    ){}
    name:string ='';
    id:string='';
    totalItem : number = 0;
    ngOnInit(): void {
      this.name = localStorage.getItem('name') || '';
      this.id = localStorage.getItem('id') || '';

      this.cartService.getProducts().subscribe(data => {
        this.totalItem = data.length;
      })
    }

    public checkIsLogged() {
      if(localStorage.getItem('isLogged') === 'true') {
        return true;
      }
      else {
        return false;
      }
    }

    public logOut(){
        const confirmation = confirm(`Are you sure you want to log out ${localStorage.getItem('name')}?`);
        if (confirmation) {
          this.scrollToTop();
          this.router.navigate(['home'])
          localStorage.removeItem('isLogged');
          localStorage.removeItem('name');
          localStorage.removeItem('id');
        }
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
      window.scroll({ top: 1000, left: 0, behavior: 'smooth' });
    }
    scrollToTop() {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
}
