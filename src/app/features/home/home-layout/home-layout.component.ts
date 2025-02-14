import { Component } from '@angular/core';
import { NavBarComponent } from '../../../shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { HeroComponent } from '../../../shared/components/hero/hero.component';
import { ProductsHomeListComponent } from '../../products/products-home-list/products-home-list/products-home-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-layout',
  imports: [NavBarComponent, ProductsHomeListComponent, FooterComponent, 
    HeroComponent, CommonModule, RouterModule],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.css' 
})
export class HomeLayoutComponent {

}
