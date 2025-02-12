import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { ProductHomeDto } from '../../../../api/api.service';
import { Observable, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-home-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './products-home-list.component.html',
  styleUrl: './products-home-list.component.css'
})

export class ProductsHomeListComponent implements OnInit{

    featuredProducts$: Observable<ProductHomeDto[]> = of([]);

    private readonly route = inject(ActivatedRoute);
    productService = inject(ProductService); 
    products: any[] = [];
    selectedId: number | null = 0;

    constructor(private router: Router) {}  
  
    ngOnInit(): void {
      //this.featuredProducts$ = this.productService.getFeaturedProducts();

      this.featuredProducts$ = this.route.paramMap.pipe(
        switchMap(params => {
          this.selectedId = Number(params.get('Id'));
          return this.productService.getFeaturedProducts();
        })
      );
    }

    openProductDetail(productId: number): void {
      this.router.navigate(['/product-detail', productId], {relativeTo: this.route})
    }
}
