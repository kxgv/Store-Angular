import { computed, inject } from '@angular/core';
import { ProductHomeDto } from './../../../api/api.service';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { addEntity, withEntities, setAllEntities, SelectEntityId } from '@ngrx/signals/entities';
import { ProductService } from 'src/app/services/product.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { pipe, switchMap, tap } from 'rxjs';

interface ProductState {
    state: 'Loading' | 'Loaded' | 'Error'
}

const initialState: ProductState = {
    state: 'Loading',
}

const selectId: SelectEntityId<ProductHomeDto> = (product) => product.Id; // Aseguramos que use 'Id' como clave primaria

export const ProductsStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withEntities<ProductHomeDto>(), 
    withComputed((store) => ({
        allProducts: computed(() => {
            return store.entities(); // Obtiene todas las entidades
        }),
        productsCount: computed(() => {
            return store.entities().length; // Obtiene el número de entidades
        }),
    })),
    withMethods((state) => {
        const productsService = inject(ProductService);
        return {
            load: rxMethod<void>(
                pipe(
                    tap(() => patchState(state, {state: "Loading"})), // Estado 'Loading'
                    switchMap(() =>
                        productsService.getFeaturedProducts().pipe(
                            tap((products) => {
                        
                                // Actualiza la colección de entidades con los productos obtenidos
                                patchState(state, setAllEntities(products, {selectId} ), {state: "Loaded"});
                            }),
                            tap(() => patchState(state)) // Estado 'Loaded'
                        )
                    )
                )
            ),
        }
    })
);