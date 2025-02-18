import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from '../store/products.state';
import { adapter } from '../store/products.state';


export const selectFeature = createFeatureSelector<ProductState>('products');
export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors(selectFeature);
export const selectAllProducts = createSelector(selectFeature, selectAll);