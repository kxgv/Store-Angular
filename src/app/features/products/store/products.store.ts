import { computed, inject } from '@angular/core';
import { ProductHomeDto } from './../../../api/api.service';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { ProductService } from 'src/app/services/product.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { pipe, switchMap, tap } from 'rxjs';
import path from 'path';

interface ProductState {
    products: ProductHomeDto[],
    state: 'Loading' | 'Loaded' | 'Error'
}

const initialState: ProductState = {
    products: [],
    state: 'Loading',
}

export const ProductsStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(({ products, state }) => ({
        productsList: computed(() => {
            console.log('Estado actualizado:', { products: products(), state: state() });
            return products();
        }),
        productsCount: computed(() => products.length),
    })),
    withMethods((store, productsService = inject(ProductService)) => ({
        load: rxMethod<void>(
            pipe(
                tap(() => patchState(store, { state: 'Loading' })), // Estado 'Loading'
                switchMap(() =>
                    productsService.getFeaturedProducts().pipe(
                        tap((products) => {
                            patchState(store, { products, state: 'Loaded' });
                        })
                    )
                )
            )
        ),
    })),
);