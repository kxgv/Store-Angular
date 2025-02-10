import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  ProductDto,
} from '../api/api.service';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  
  constructor() {}
  
  private apiUrl = 'https://localhost:7040/Products';  // URL backend
  private http = inject(HttpClient);

  // Obtener productos destacados
  getFeaturedProducts(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(`${this.apiUrl}/featured`);
  }

  // Obtener un producto por su ID
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  } 

}