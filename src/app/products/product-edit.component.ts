import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';

function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return {range: true};
    }
    return null;
  };
}

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  get tags(): FormArray {
    return this.productForm.get('tags') as FormArray;
  }

  // Read the product ID from the route parameter
  // this.sub = this.route.params.subscribe(
  //   params => {
  //     const id = +params['id'];
  //     this.getProduct(id);
  //   }
  // )

  // private getProduct(id: number) {
  // }

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]],
      productCode: ['', Validators.required],
      rating: [null, ratingRange(1, 5)],
      tags: this.fb.array([]),
      description: ''
    });
  }

  addTag() {
    this.tags.push(this.buildTag());
  }

  deleteTag(i: number) {
    this.tags.controls.splice(i, 1);
  }

  private buildTag() {
    return this.fb.group({
      tag: ''
    });
  }
}
