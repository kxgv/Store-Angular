import { Routes } from "@angular/router";
import { HomeLayoutComponent } from "../home/home-layout/home-layout.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductsHomeListComponent } from "./products-home-list/products-home-list/products-home-list.component";


export const PRODUCTS_ROUTES: Routes = [
    // { path: '', component: ProductsHomeListComponent }, // Muestra la lista de productos dentro del home
    { path: 'product-detail/:Id', component: ProductDetailComponent } // Ruta dinámica para el detalle del producto
]