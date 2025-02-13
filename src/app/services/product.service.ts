import { ProductDetailDto } from './../api/api.service';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import {
  ProductHomeDto,
} from '../api/api.service';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  
  constructor() {}

  private http = inject(HttpClient);
  private URLbase = environment.apiURL;  // URL backend


  // Obtener productos destacados
  getFeaturedProducts(): Observable<ProductHomeDto[]> {
    return this.http.get<ProductHomeDto[]>(`${this.URLbase}/Products/featured`);
  }

  // Obtener un producto por su ID
  getDetailedProduct(productId: number): Observable<ProductDetailDto> {
    return this.http.get<ProductDetailDto>(`${this.URLbase + "/Products/product-detail"}/${productId}`);
  } 

}