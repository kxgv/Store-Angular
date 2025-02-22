import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { ProductDto, ProductHomeDto } from '../../../api/api.service';
import { computed, inject, InjectionToken } from '@angular/core';
import { ProductService } from '../../../services/product.service';

type ProductState = {
    products: ProductHomeDto[];
    isLoading: boolean;
    filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: ProductState = {
    products: [],
    isLoading: false,
    filter: { query: '', order: 'asc' },
};

const BOOKS_STATE = new InjectionToken<ProductState>('BooksState', {
    factory: () => initialState,
});

export const ProductsStore = signalStore(
    { providedIn: 'root' },
    withState(() => inject(BOOKS_STATE)),
    // 👇 Accessing previously defined state signals and properties.
    withComputed(({ products, filter }) => ({
        booksCount: computed(() => products().length),
        sortedBooks: computed(() => {
            const direction = filter.order() === 'asc' ? 1 : -1;

            return products()
                .filter((p) => p.Name !== null)
                .slice()
                .sort((a, b) => direction * a.Name!.localeCompare(b.Name!));

        }),
    })),
    withMethods((store, productsService = inject(ProductService)) => ({
        /* ... */
        // 👇 Defining a method to load all books.
        async loadAll(): Promise<void> {
          patchState(store, { isLoading: true });
    
          const products = (await productsService.getAllFeaturedProducts()) ?? [];
          patchState(store, { products, isLoading: false });
        },
      }))
);