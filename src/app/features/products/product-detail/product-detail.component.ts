import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductDetailDto } from '../../../api/api.service';
import { ProductService } from '../../../services/product.service';
import { NavBarComponent } from "../../../shared/components/nav-bar/nav-bar.component";
import { CommonModule, Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RouterModule, NavBarComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  productId: string | null = null;
  product$: Observable<ProductDetailDto> | undefined;

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);

  constructor(private location: Location, private dialog: MatDialog) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('Id');
    const productId = idParam ? Number(idParam) : null;
  
    if (!productId || isNaN(productId)) {
      console.error("Invalid product ID");
      return;
    }

    this.product$ = this.productService.getDetailedProduct(productId);
  }
}
