import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/products.interface';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [MatButtonModule,MatInputModule,MatFormFieldModule,ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
    productsService = inject(ProductsService);
      matSnackBar = inject(MatSnackBar);
      router = inject(Router)
      product: Product = inject(ActivatedRoute).snapshot.data['product'];

      form = new FormGroup(
        {
          title : new FormControl<string>(this.product.title,{
            nonNullable : true,
            validators: Validators.required}),
        }
      );    
  
      onSubmit() 
      {
        this.productsService.atualizarProduto(this.product.id,
          {
            
            title: this.form.controls.title.value,
        }).subscribe(()=>{
          this.matSnackBar.open('Produto atualizado com sucesso!','Ok')
          this.router.navigateByUrl('/');
        });
      }    
}
