import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductsService } from '../services/products.service';

export const getProductById = () => {
  (route: ActivatedRouteSnapshot) => {
    const productsService = inject(ProductsService);
    return productsService.getById(route.paramMap.get('id') as string);
  };
};
