import { Component, inject, Injectable } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { filter, Observable } from 'rxjs';
import { ProductsService } from './products.service';

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

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {
 matDialog = inject(MatDialog);
  productsService = inject(ProductsService);
  constructor() { }

  openDialog():Observable<boolean> {
     return this.matDialog
          .open(ConfirmDialogComponent)
          .afterClosed()
 }
}
