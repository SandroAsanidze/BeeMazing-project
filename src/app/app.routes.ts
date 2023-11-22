import { Routes } from '@angular/router';
import { authGuard, authGuard1 } from './auth/guards/auth.guard';
import { productsResolver } from './products/resolver/products.resolver';
import { detailsResolver } from './products/product-details/resolver/details.resolver';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
    },
    {
        path:'products',
        loadComponent: () => import('./products/products.component').then(c => c.ProductsComponent),
        resolve: {
            resolveProducts:productsResolver
        }
    },
    {
        path:'products/:id',
        loadComponent: () => import('./products/product-details/product-details.component').then(c => c.ProductDetailsComponent),
        resolve: {
            resolveDetails:detailsResolver
        }
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
    },
    {
        path:'help',
        loadComponent: () => import('./feedback/feedback.component').then(c => c.FeedbackComponent),
    },
    {
        path:'**',
        loadComponent: () => import('./error/error.component').then(c => c.ErrorComponent)
    }
];
