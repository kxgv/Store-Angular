import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CreateProductDto, ProductDto } from '../../../api/api.service';

@Component({
  selector: 'app-create-product',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit, OnDestroy {
  
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

    get fc() {
      return this.createProductForm.controls;
    }

    productService = inject(ProductService);

      constructor(
        private router: Router, 
        private renderer: Renderer2, 
        @Inject(DOCUMENT) private document: Document) { }

    ngOnDestroy(): void {
      this.renderer.removeClass(this.document.documentElement, 'login-page');
    }

    ngOnInit(): void {
      this.renderer.addClass(this.document.documentElement, 'login-page');
      this.initializeForm();
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
            isFeatured: new FormControl<boolean>(false),
            imageURL:new FormControl<string | null>(null),
      });
    }

    onSubmit() {
      this.submitted = true;
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
  
      this.productService.createProduct(productData).subscribe({
        next: (response) => {
          console.log('Producto creado exitosamente', response);
        },
        error: (err) => {
          this.error = 'Error al crear el producto. Por favor, inténtalo de nuevo.';
          console.error('Error al crear el producto', err);
        }
      });
    }
}
