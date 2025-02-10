import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { ProductDto } from '../../../../api/api.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-list-products',
  imports: [CommonModule],
  templateUrl: './home-list-products.component.html',
  styleUrl: './home-list-products.component.css'
})

export class HomeListProductsComponent implements OnInit {
  featuredProducts$: Observable<ProductDto[]> = of([]);

  productService = inject(ProductService); 
  products: any[] = [];

  constructor() {}  

  ngOnInit(): void {
    console.log("Init HomeListProductsComponent");
  
    this.featuredProducts$ = this.productService.getFeaturedProducts();
  }
  
}
