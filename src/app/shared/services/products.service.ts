import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  httpClient = inject(HttpClient);
  produtos: any[] = []

  getAll(){
    return this.httpClient.get<Product[]>('/api/products');
  }
}
