import { AuthService } from './../../../../services/auth.service';
import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { ProductHomeDto } from '../../../../api/api.service';
import { map, Observable, of, switchMap } from 'rxjs';
import { CommonModule, DOCUMENT, JsonPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState, selectAll} from '../../store/products.selectors';
import * as Actions from '../../../products/store/products.actions';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';
import { MatDialog } from '@angular/material/dialog'; // Importa MatDialog
import { HttpErrorResponse } from '@angular/common/http';
import { ProductsStore } from '../../store/products.store';

@Component({
  selector: 'app-products-home-list',
  imports: [CommonModule, RouterModule, JsonPipe],
  templateUrl: './products-home-list.component.html',
  styleUrl: './products-home-list.component.css'
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
          console.log("DOCUMENT");
          console.log(counter);
          this.isAdmin = this.authService.getIsAdmin(localStorage);
          console.log(this.isAdmin);
        } else {
          console.log(counter);
        }
      }
  }

  ngOnInit(): void {

    this.featuredProducts$ = this.productService.products$; // Suscribirse al observable reactivo del servicio
  
    this.route.paramMap.subscribe(params => {
      this.selectedId = Number(params.get('Id'));
    });

    this.store.load(); 
  
    //this.productService.getFeaturedProducts(); // Cargar productos al iniciar
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
