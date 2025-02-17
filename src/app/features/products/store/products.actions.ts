import { createAction, props } from '@ngrx/store';
import {ProductHomeDto} from '../../../api/api.service';

export const login = createAction(
  '[Login Page] Login',
  props<{ username: string; password: string }>()
);

export const getAllProducts = createAction(
  '[Products] Get all products',
);

export const getAllProductsSucces = createAction(
  '[Products] Get all products success',
  props<{ products: ProductHomeDto[] }>()
);