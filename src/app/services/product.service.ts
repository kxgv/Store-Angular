import { ProductDetailDto } from './../api/api.service';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  ProductHomeDto,
} from '../api/api.service';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  
  constructor() {}
  
  private apiUrl = 'http://localhost:7040/Products';  // URL backend
  private http = inject(HttpClient);

  // Obtener productos destacados
  getFeaturedProducts(): Observable<ProductHomeDto[]> {
    return this.http.get<ProductHomeDto[]>(`${this.apiUrl}/featured`);
  }

  // Obtener un producto por su ID
  getDetailedProduct(productId: number): Observable<ProductDetailDto> {
    return this.http.get<ProductDetailDto>(`${this.apiUrl + "/product-detail"}/${productId}`);
  } 

}