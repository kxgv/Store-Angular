
import { ProductDto } from '../../../api/api.service';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface ProductState extends EntityState<ProductDto> {
  loading: boolean;
  error: string | null;
  selectedProductId: string | null;
}

export const adapter: EntityAdapter<ProductDto> = createEntityAdapter<ProductDto>();

export const initialState: ProductState = adapter.getInitialState({
  loading: false,
  error: null,
  selectedProductId: null,
});