import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/products.interface';
import { CardComponent } from './components/card/card.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{
  products: Product[] = [];
  productsService = inject(ProductsService);

  ngOnInit(): void {
    this.productsService.getAll().subscribe((product) =>{
      this.products = product
    });
  }
}
