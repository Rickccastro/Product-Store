import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{
  products: any[] = [];
  productsService = inject(ProductsService);

  ngOnInit(): void {
    this.productsService.getAll().subscribe((products) =>{
      this.products = products
    });
  }
}
