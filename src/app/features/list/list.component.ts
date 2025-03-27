import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/products.interface';


import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatCardModule,MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{
  products: Product[] = [];
  productsService = inject(ProductsService);

  ngOnInit(): void {
    this.productsService.getAll().subscribe((products) =>{
      this.products = products
    });
  }
}
