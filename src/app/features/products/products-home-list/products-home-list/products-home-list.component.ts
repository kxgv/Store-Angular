import { AuthService } from './../../../../services/auth.service';
import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { ProductHomeDto } from '../../../../api/api.service';
import { Observable, of } from 'rxjs';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material/dialog'; 
import { HttpErrorResponse } from '@angular/common/http';
import { ProductsStore } from '../../store/products.store';

@Component({
  selector: 'app-products-home-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './products-home-list.component.html',
  styleUrl: './products-home-list.component.css',
})

export class ProductsHomeListComponent implements OnInit {

  @Input() isFeatured: boolean = false;

  featuredProducts$: Observable<ProductHomeDto[]> = of([]);

  private readonly route = inject(ActivatedRoute);
  readonly store = inject(ProductsStore); 

  productService = inject(ProductService);
  authService = inject(AuthService);

  products: any[] = [];
  selectedId: number | null = 0;
  filteredProducts$: Observable<ProductHomeDto[]> | undefined; 
  role: string | null = "";
  selectedProductId: number | null = null;
  isModalOpen = false;
  isAdmin: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private dialog: MatDialog) {

      const localStorage = document.defaultView?.localStorage;
      if (localStorage) {
        const counter = localStorage.getItem('token');

        if (counter) {
          this.isAdmin = this.authService.getIsAdmin(localStorage);
          console.log(this.isAdmin);
        } else {
          console.log(counter);
        }
      }
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.selectedId = Number(params.get('Id'));
    });

    this.loadProducts();
  }

  loadProducts(): void {
    this.store.load(); 
    console.log("productState", this.store.state());
  }
  
  openProductDetail(productId: number): void {
    this.router.navigate(['/product-detail', productId], { relativeTo: this.route })
  }

  openModal(productId: number) {
    this.selectedProductId = productId;
    this.isModalOpen = true; // Abre el modal
  }

  onConfirmDelete() {
    if (this.selectedProductId !== null) {
      this.productService.deleteProduct(this.selectedProductId).subscribe({
        next: () => {
          console.log('Producto eliminado:', this.selectedProductId);
          this.isModalOpen = false;
          this.productService.getFeaturedProducts(); // Actualiza la lista de productos
        },
        error: (err) => {
          if (err instanceof HttpErrorResponse && err.status === 200) {
            console.warn('El backend devolvió una respuesta no JSON, pero el producto se eliminó correctamente.');
            this.isModalOpen = false;
            this.productService.getFeaturedProducts();
          } else {
            console.error('Error al eliminar el producto:', err);
          }
        },
      });
    }
  }
  
  onCancelDelete() {
    this.isModalOpen = false; // Cierra el modal
  }
}
