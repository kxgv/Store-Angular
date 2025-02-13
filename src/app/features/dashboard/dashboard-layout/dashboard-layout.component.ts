import { Component } from '@angular/core';
import { ProductsHomeListComponent } from '../../products/products-home-list/products-home-list/products-home-list.component';

@Component({
  selector: 'app-dashboard-layout',
  imports: [ProductsHomeListComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {

}
