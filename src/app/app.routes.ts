import { Routes } from '@angular/router';
import { authGuard, authGuard1 } from './auth/guards/auth.guard';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
    },
    {
        path:'products',
        loadComponent: () => import('./products/products.component').then(c => c.ProductsComponent)
    },
    {
        path:'products/:id',
        loadComponent: () => import('./products/product-details/product-details.component').then(c => c.ProductDetailsComponent)
    },
    {
        path:'home',
        loadComponent: () => import('./home/home.component').then(c => c.HomeComponent)
    },
    {
        path:'registration',
        loadComponent: () => import('./registration/registration.component').then(c => c.RegistrationComponent),
        canActivate:[authGuard]
    },
    {
        path:'cart',
        loadComponent: () => import('./cart/cart.component').then(c => c.CartComponent),
        canActivate:[authGuard1]
    }
];
