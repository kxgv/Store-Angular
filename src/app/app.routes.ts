import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './features/home/home-layout/home-layout.component';
import { PRODUCTS_ROUTES } from './features/products/products.route';
import { ProductDetailComponent } from './features/products/product-detail/product-detail.component';
import { LoginComponent } from './features/login/login/login.component';

export const routes: Routes = [
  {
    path: '', 
    component: HomeLayoutComponent,
    // children: PRODUCTS_ROUTES,
    // path: '',
    // component: HomeLayoutComponent,

    //loadChildren: () => import('./features/products/products.route').then(m => m.PRODUCTS_ROUTES)
  },
  {
    path: 'product-detail/:Id',
    component: ProductDetailComponent,
  }, 
  {
    path: 'login',
    component: LoginComponent,
  }
];
