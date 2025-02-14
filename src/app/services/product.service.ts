import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import {
  ProductHomeDto,
  ProductDetailDto,
  ProductDto,
  CreateProductDto,
} from '../api/api.service';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  
  constructor() {}

  private http = inject(HttpClient);
  private URLbase = environment.apiURL;  // URL backend

  private productsSubject = new BehaviorSubject<ProductHomeDto[]>([]);
  products$ = this.productsSubject.asObservable();

  // Obtener productos destacados
  getFeaturedProducts(): void {
    this.http.get<ProductHomeDto[]>(`${this.URLbase}/Products/featured`).subscribe({
      next: (products) => this.productsSubject.next(products),
      error: (err) => console.error('Error al obtener productos:', err),
    });
  }

  // Obtener un producto por su ID
  getDetailedProduct(productId: number): Observable<ProductDetailDto> {
    return this.http.get<ProductDetailDto>(`${this.URLbase + "/Products/product-detail"}/${productId}`);
  }
  
  getAllProducts(): Observable<ProductHomeDto[]> {
    console.log("getAllProducts");
    return this.http.get<Array<ProductHomeDto>>(`${this.URLbase}/Products/all`);
  }

  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.URLbase}/Products/delete/${productId}`);
  }

  createProduct(product: CreateProductDto): Observable<CreateProductDto> {
    return this.http.post<CreateProductDto>(`${this.URLbase}/Products`, product);
  }

}