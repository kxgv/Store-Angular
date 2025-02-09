import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeListProductsComponent } from './home-list-products.component';

describe('HomeListProductsComponent', () => {
  let component: HomeListProductsComponent;
  let fixture: ComponentFixture<HomeListProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeListProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeListProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
