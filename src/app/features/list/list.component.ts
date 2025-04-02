import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/products.interface';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog
} from '@angular/material/dialog';
import { filter } from 'rxjs';
import { ConfirmationDialogService } from '../../shared/services/confirmation-dialog.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  products: Product[] = [];
  productsService = inject(ProductsService);
  router = inject(Router);
  confirmationDialogService = inject(ConfirmationDialogService);


  ngOnInit(): void {
    this.productsService.getAll().subscribe((product) => {
      this.products = product;
    });
  }

  onEdit(product: Product) {
    this.router.navigate(['edit-product/', product.id]);
  }

  onDelete(product: Product) {
    this.confirmationDialogService.openDialog()
      .pipe(filter((answer) => answer === true))
      .subscribe(() => { 
        this.productsService.deletarProduto(product.id).subscribe({
          next: () => {
            this.products = this.products.filter(p => p.id !== product.id);
          },
          error: (err) => {
            console.error("Erro ao deletar o produto:", err);
          }
        });
      });
  }
}
