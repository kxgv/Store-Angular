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
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';
import { MatDialog } from '@angular/material/dialog'; // Importa MatDialog
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-products-home-list',
  imports: [CommonModule, RouterModule, ConfirmModalComponent],
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
  selectedProductId: number | null = null;
  isModalOpen = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.featuredProducts$ = this.productService.products$; // Suscribirse al observable reactivo del servicio
  
    this.route.paramMap.subscribe(params => {
      this.selectedId = Number(params.get('Id'));
    });
  
    console.log('ey im this role', this.role);
  
    this.productService.getFeaturedProducts(); // Cargar productos al iniciar
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
