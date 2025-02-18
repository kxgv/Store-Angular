
import { createReducer, on } from '@ngrx/store';
import * as ProductsActions from '../store/products.actions.ts';
import { initialState } from './products.state.ts';
import { adapter } from './products.state.ts';

export const productReducer = createReducer(
  initialState,
  on(ProductsActions.getAllProductsSuccess, (state, { products }) => {
    return adapter.setAll(products, state)
  }));