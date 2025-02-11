import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsHomeListComponent } from './products-home-list.component';

describe('ProductsHomeListComponent', () => {
  let component: ProductsHomeListComponent;
  let fixture: ComponentFixture<ProductsHomeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsHomeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsHomeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
