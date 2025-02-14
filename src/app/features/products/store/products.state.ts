import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductHomeDto } from '../../../api/api.service'; //change for ProductDto

export interface ProductState {
  products: ProductHomeDto[];
  loading: boolean;
  error: any;
}

export const ProductState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const initialProductState: ProductState = {
    products: [],
    loading: false,
    error: null,
  };

// Selectores
export const selectProductsState = createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
  selectProductsState,
  (state: ProductState) => state.products
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  (state: ProductState) => state.loading
);

export const selectProductsError = createSelector(
  selectProductsState,
  (state: ProductState) => state.error
);