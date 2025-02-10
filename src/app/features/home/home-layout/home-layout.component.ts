import { Component } from '@angular/core';
import { NavBarComponent } from '../../../shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { HeroComponent } from '../../../shared/components/hero/hero.component';
import { HomeListProductsComponent } from '../home-list-products/home-list-products/home-list-products.component';

@Component({
  selector: 'app-home-layout',
  imports: [NavBarComponent, HomeListProductsComponent, FooterComponent, HeroComponent],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.css' 
})
export class HomeLayoutComponent {

}
