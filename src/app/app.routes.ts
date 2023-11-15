import { Routes } from '@angular/router';
import { productsResolver } from './products/resolver/products.resolver';

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
        loadComponent: () => import('./registration/registration.component').then(c => c.RegistrationComponent)
    },
    {
        path:'login',
        loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
    }
];
