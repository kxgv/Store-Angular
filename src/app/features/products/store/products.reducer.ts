
import { createReducer, on } from '@ngrx/store';
import * as ProductsActions from '../store/products.actions';
import { initialState } from './products.state';
import { adapter } from './products.state';

export const productReducer = createReducer(
  initialState,
  on(ProductsActions.getAllProductsSuccess, (state, { products }) => {
    return adapter.setAll(products, state)
  }));