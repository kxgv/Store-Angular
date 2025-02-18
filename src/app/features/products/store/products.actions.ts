import { createAction, props } from '@ngrx/store';
import {ProductDto, ProductHomeDto} from '../../../api/api.service';

export const login = createAction(
  '[Login Page] Login',
  props<{ username: string; password: string }>()
);

export const getAllProducts = createAction(
  '[Products] Get all products',
);

export const getAllProductsSuccess = createAction(
  '[Products] Get all products success',
  props<{ products: ProductDto[] }>()
);

export const getAllProductsFailure = createAction(
  '[Products] Get All Products Failure',
  props<{ error: string }>()
);

export const selectProduct = createAction(
  '[Products] Select Product',
  props<{ productId: string }>()
);