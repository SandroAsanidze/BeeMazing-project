import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProductsService } from '../service/products.service';
import { catchError, of } from 'rxjs';

export const productsResolver: ResolveFn<boolean> = (route, state) => {
  const productService = inject(ProductsService);
  return productService.getProducts().pipe(catchError((err)=> {
    return of(err);
  }))
};
