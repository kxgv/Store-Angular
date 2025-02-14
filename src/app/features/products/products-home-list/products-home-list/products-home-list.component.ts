import { AuthService } from './../../../../services/auth.service';
import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { ProductHomeDto } from '../../../../api/api.service';
import { map, Observable, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState, selectAll} from '../../store/products.selectors';
import * as Actions from '../../../products/store/products.actions';

@Component({
  selector: 'app-products-home-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './products-home-list.component.html',
  styleUrl: './products-home-list.component.css'
})

export class ProductsHomeListComponent implements OnInit {

  @Input() isFeatured: boolean = false;

  featuredProducts$: Observable<ProductHomeDto[]> = of([]);

  private readonly route = inject(ActivatedRoute);
  productService = inject(ProductService);
  authService = inject(AuthService);

  products: any[] = [];
  selectedId: number | null = 0;
  filteredProducts$: Observable<ProductHomeDto[]> | undefined; 
  role: string | null = "";

  constructor(
    private router: Router,
    private store: Store<AppState>) {
  }

  ngOnInit(): void {
    //this.featuredProducts$ = this.productService.getFeaturedProducts();

    this.featuredProducts$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = Number(params.get('Id'));
        return this.productService.getFeaturedProducts();
      })
    ); 
    
    console.log('ey im this role', this.role);
  }

  openProductDetail(productId: number): void {
    this.router.navigate(['/product-detail', productId], { relativeTo: this.route })
  }
}
