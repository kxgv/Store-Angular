import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './features/home/home-layout/home-layout.component';
import { PRODUCTS_ROUTES } from './features/products/products.route';
import { ProductDetailComponent } from './features/products/product-detail/product-detail.component';
import { LoginComponent } from './features/login/login/login.component';
import { DashboardLayoutComponent } from './features/dashboard/dashboard-layout/dashboard-layout.component';
import { productsReducer } from './features/products/store/products.reducer';
import { ProductsEffects } from './features/products/store/products.effects';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { provideState, StoreModule } from '@ngrx/store';
import { ProductState } from './features/products/store/products.state';
import { CreateEditProductComponent } from './features/products/create-edit-product/create-edit-product.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
  },
  {
    path: 'product-detail/:Id',
    component: ProductDetailComponent
  },
  {
    path: 'create-product',
    component: CreateEditProductComponent
  },
  {
    path: 'product-edit/:Id',
    component: CreateEditProductComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
  }
];
