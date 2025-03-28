import { Component, input,computed } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../../../shared/interfaces/products.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule,MatButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  product = input.required<Product>();
  productTitle = computed(() => this.product().title)

}
