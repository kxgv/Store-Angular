import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import {CreateProductDto, ProductDetailDto, ProductDto} from '../../../api/api.service';

@Component({
  selector: 'app-create-edit-product',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './create-edit-product.component.html',
  styleUrl: './create-edit-product.component.css'
})
export class CreateEditProductComponent implements OnInit, OnDestroy {

  createProductForm!: FormGroup<{
      name: FormControl<string | null>;
      color: FormControl<string | null>;
      price: FormControl<number | null>;
      size: FormControl<string | null>;
      description: FormControl<string | null>;
      isFeatured: FormControl<boolean>;
      imageURL: FormControl<string | null>;
    }>;

    submitted = false;
    error: string = '';

    productData!: ProductDetailDto;
    productId: number | null = null;
    isEditing = false;


    get fc() {
      return this.createProductForm.controls;
    }

    productService = inject(ProductService);

      constructor(
        private route: ActivatedRoute,
        private router: Router,
        private renderer: Renderer2,
        @Inject(DOCUMENT) private document: Document) { }

    ngOnDestroy(): void {
      this.renderer.removeClass(this.document.documentElement, 'login-page');
    }

    ngOnInit(): void {
      this.renderer.addClass(this.document.documentElement, 'login-page');

      const idParam = this.route.snapshot.paramMap.get('Id');
      const productId = idParam ? Number(idParam) : null;
      this.productId = productId;

      console.log("productId from URL", productId);

      this.initializeForm();

      if (productId) {
        this.loadProductData(productId);
        this.isEditing = true;
      }
    }

    initializeForm() {
      this.createProductForm = new FormGroup<{
            name: FormControl<string | null>;
            color: FormControl<string | null>;
            price: FormControl<number | null>;
            size: FormControl<string | null>;
            description: FormControl<string | null>;
            isFeatured: FormControl<boolean>;
            imageURL: FormControl<string | null>;
          }>({
            name: new FormControl<string | null>(null, Validators.required),
            color: new FormControl<string | null>(null, Validators.required),
            price: new FormControl<number | null>(0, Validators.required),
            size: new FormControl<string | null>(null, Validators.required),
            description: new FormControl<string | null>(null, Validators.required),
            isFeatured: new FormControl<boolean>(false, {
              validators: Validators.required,
              nonNullable: true
            }),
            imageURL:new FormControl<string | null>(null),
      });
    }

    loadProductData(productId: number) {
      this.productService.getProductById(productId).subscribe({
        next: (product) => {
          console.log("getting product", product);
          this.productData = product;
          this.populateForm(product);
        },
        error: (err) => {
          this.error = 'No se pudo cargar el producto. Por favor, inténtalo de nuevo.';
          console.error('Error al cargar el producto', err);
        }
      });
    }

    populateForm(product: ProductDetailDto) {
      this.fc.name.setValue(product.Name);
      this.fc.color.setValue(product.Color);
      this.fc.price.setValue(product.Price);
      this.fc.size.setValue(product.Size);
      this.fc.description.setValue(product.Description);
      this.fc.isFeatured.setValue(Boolean(product.IsFeatured));
      this.fc.imageURL.setValue(product.ImageURL);
    }

    onSubmit() {
      this.submitted = true;
      this.isEditing = false;
      if (this.createProductForm.invalid) {
        this.error = 'Por favor, completa el formulario correctamente.';
        return;
      }

      const productData: CreateProductDto = {
        Name: this.fc.name.value,
        Color: this.fc.color.value,
        Price: this.fc.price.value,
        Size: this.fc.size.value,
        Description: this.fc.description.value,
        ImageURL: this.fc.imageURL.value,
        IsFeatured: this.fc.isFeatured.value,
      };

      if (this.productId) {
        console.log("updating product", this.productId);
        this.productService.updateProduct(this.productId, productData).subscribe({
          next: () => {
            this.router.navigate(['/']);
            console.log('Producto actualizado exitosamente');
          },
          error: (err) => {
            this.error = 'Error al actualizar el producto.';
            console.error(err);
          }
        });
      } else {
        this.productService.createProduct(productData).subscribe({
          next: () => {
            this.router.navigate(['/']);
            console.log('Producto creado exitosamente');
          },
          error: (err) => {
            this.error = 'Error al crear el producto.';
            console.error(err);
          }
        });
      }

    }
}
