import { Routes } from '@angular/router';
import { authGuard, authGuard1 } from './core/guards/auth.guard';
import { productsResolver } from './shared/resolvers/products-resolver/products.resolver';
import { detailsResolver } from './shared/resolvers/product-resolver/details.resolver';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
    },
    {
        path:'products',
        loadComponent: () => import('./features/products/products.component').then(c => c.ProductsComponent),
        resolve: {
            resolveProducts:productsResolver
        }
    },
    {
        path:'products/:id',
        loadComponent: () => import('./features/products/product-details/product-details.component').then(c => c.ProductDetailsComponent),
        resolve: {
            resolveDetails:detailsResolver
        }
    },
    {
        path:'home',
        loadComponent: () => import('./features/home/home.component').then(c => c.HomeComponent)
    },
    {
        path:'registration',
        loadComponent: () => import('./features/registration/registration.component').then(c => c.RegistrationComponent),
        canActivate:[authGuard]
    },
    {
        path:'cart',
        loadComponent: () => import('./features/cart/cart.component').then(c => c.CartComponent),
        canActivate:[authGuard1]
    },
    {
        path:'help',
        loadComponent: () => import('./features/feedback/feedback.component').then(c => c.FeedbackComponent),
    },
    {
        path:'**',
        loadComponent: () => import('./features/error/error.component').then(c => c.ErrorComponent)
    }
];
