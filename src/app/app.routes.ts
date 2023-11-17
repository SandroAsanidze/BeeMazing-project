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
        path:'home',
        loadComponent: () => import('./home/home.component').then(c => c.HomeComponent)
    },
    {
        path:'registration',
        loadComponent: () => import('./registration/registration.component').then(c => c.RegistrationComponent),
        canActivate:[authGuard]
    },
    {
        path:'login',
        loadComponent: () => import('./login/login.component').then(c => c.LoginComponent),
        canActivate:[authGuard]
    },
    {
        path:'cart',
        loadComponent: () => import('./cart/cart.component').then(c => c.CartComponent),
        canActivate:[authGuard1]
    }
];
