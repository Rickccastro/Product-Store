import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../interfaces/products.interface';
import { ProductPayload } from '../interfaces/payload-product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  httpClient = inject(HttpClient);
  produtos: any[] = []

  getAll(){
    return this.httpClient.get<Product[]>('/api/products');
  }

  cadastroProduto(payload: ProductPayload){
    return this.httpClient.post<ProductPayload>('/api/products', payload);
 }
}
