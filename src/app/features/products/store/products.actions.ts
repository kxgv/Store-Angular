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