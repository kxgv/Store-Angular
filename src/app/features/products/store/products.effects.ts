import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ProductService } from '../../../services/product.service';

@Injectable()
export class ProductsEffects {

// loadProducts$ = createEffect(() => this.actions$.pipe(
//   ofType(callAllProducts), 
//   exhaustMap(() => 
//     this.productService.getAllProducts().pipe(
//       map(studentsRecords => callAllProductsSuccess({ data: studentsRecords })), // Usamos `callAllProductsSuccess` con el payload correcto
//       catchError(() => EMPTY) 
//     )
//   )
// ));

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

}
