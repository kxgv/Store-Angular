import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from '../store/products.state';
import { ProductHomeDto } from '../../../api/api.service';

export interface AppState {
  products: ProductHomeDto[]
}

export const selectFeature = (state: AppState) => state.products;

export const selectAll = createSelector(selectFeature, (state: ProductHomeDto[]) => state); 