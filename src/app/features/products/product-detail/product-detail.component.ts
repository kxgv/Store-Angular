import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductDto } from '../../../api/api.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  productId: string | null = null;
  hero$: Observable<ProductDto> | undefined;

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);

  constructor() {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('Id');
    //this.hero$ = this.productService.getDetailedProduct(productId);
    
  }

}
