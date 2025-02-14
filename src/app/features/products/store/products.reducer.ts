import { createReducer, on } from '@ngrx/store';
import { ProductHomeDto } from '../../../api/api.service';

export const initState: ReadonlyArray<ProductHomeDto> = [{
  Id: 1,
  Name: "",
  Price: 11,
  Description:"",
  ImageURL: "",
  IsFeatured: "1",
}]; 

export const productsReducer = createReducer(initState);