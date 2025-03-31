import { Component, EventEmitter, input, OnInit,Output} from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../interfaces/products.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [[MatButtonModule,MatInputModule,MatFormFieldModule,ReactiveFormsModule],],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{
  @Output() send = new EventEmitter<Product>();
  product = input<Product | null >(null);
  form! : FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup(
      {
          title : new FormControl<string>(this.product()?.title ?? '',{
          nonNullable : true,
          validators: Validators.required}),
      }
    ); 
  }

  onSubmit(){
    const product = this.form.value as Product;
    this.send.emit(product)
  }
     
}
