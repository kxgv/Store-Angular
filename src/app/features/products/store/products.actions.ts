import { create } from 'domain';
import { ProductHomeDto } from './../../../api/api.service';
import { createAction, props } from '@ngrx/store';

export const actionList = {
  callAllProducts: "[ Products ] Call all products ",
  callAllProductsSuccess: "[ Products ] Call all products success",
};

export const callAllProducts = createAction(actionList.callAllProducts);
export const callAllProductsSuccess = createAction(actionList.callAllProductsSuccess, props<{ data: ProductHomeDto[]}>());