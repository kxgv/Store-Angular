import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { ProductService } from '../../../services/product.service';
import { ProductHomeDto } from '../../../api/api.service';
import { create } from 'domain';
import { actionList, callAllProductsSuccess, callAllProducts } from './products.actions';

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
