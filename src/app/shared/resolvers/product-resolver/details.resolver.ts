import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { ProductsService } from '../../services/products-service/products.service';
import { catchError, of } from 'rxjs';

export const detailsResolver: ResolveFn<boolean> = (route, state) => {
  const id = route.params['id']

  const productService = inject(ProductsService);
  return productService.getSingleProduct(id).pipe(catchError((err)=> {
    return of(err);
  }))
};
