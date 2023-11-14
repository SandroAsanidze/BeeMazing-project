import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'registration',
        loadComponent: () => import('./registration/registration.component').then(c => c.RegistrationComponent)
    },
    {
        path:'login',
        loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
    }
];
