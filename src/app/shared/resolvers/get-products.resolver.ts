import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductsService } from '../services/products.service';

export const getProducts = () => {
  const productsService = inject(ProductsService);
  return productsService.getAll();
};


