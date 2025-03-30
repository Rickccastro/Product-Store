import { Component,OnInit,inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatButtonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent{
    productsService = inject(ProductsService);
    matSnackBar = inject(MatSnackBar);
    router= inject(Router)
    form = new FormGroup(
      {
        title : new FormControl<string>('',{nonNullable : true, validators: Validators.required}),
      }
    );    

    onSubmit() 
    {
      this.productsService.cadastroProduto(
        {
          title: this.form.controls.title.value,
      }).subscribe((data)=>{
        this.matSnackBar.open('Produto cadastrado com sucesso!','Ok')
        this.router.navigateByUrl('/');
      });
    }    
}
