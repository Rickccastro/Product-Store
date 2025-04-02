import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/products.interface';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { filter } from 'rxjs';

@Component({
  selector: 'app-confirm-dialog',
  template: `<h1 mat-dialog-title>Delete file</h1>
    <div mat-dialog-content >Tem certeza que deseja deletar o produto?</div>
    <div mat-dialog-actions align="end">
      <button mat-button mat-dialog-close (click)="onNo()">Não</button>
      <button mat-raised-button color="primary" mat-dialog-close cdkFocusInitial (click)="onYes()">Sim</button>
    </div>`,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class ConfirmDialogComponent {
  matDialogRef = inject(MatDialogRef);

  onNo() {
    this.matDialogRef.close(false);
  }
  onYes() {
    this.matDialogRef.close(true);
  }
}

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
  matDialog = inject(MatDialog);

  ngOnInit(): void {
    this.productsService.getAll().subscribe((product) => {
      this.products = product;
    });
  }

  onEdit(product: Product) {
    this.router.navigate(['edit-product/', product.id]);
  }

  onDelete(product: Product) {
    this.matDialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .pipe(filter((answer: boolean) => answer === true))
      .subscribe(() => {  
        this.productsService.deletarProduto(product.id  ).subscribe({
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
