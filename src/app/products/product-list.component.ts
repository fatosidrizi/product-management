import {Component, Input, OnInit} from '@angular/core';
import {IProduct} from './product';
import {ProductService} from './product.service';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['/product-list.component.css']
})

export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  filteredProducts: IProduct[];
  products: IProduct[] = [];
  errorMessage: string;

  constructor(private productService: ProductService) {
    // this.listFilter = 'cart';
  }

  private _listFilter;

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performfilter(this.listFilter) : this.products;
  }

  ngOnInit(): void {
    console.log('In OnInit');
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;

      },
      error: err => this.errorMessage = err
    });
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List ' + message;
  }

  private performfilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLowerCase();
    // const filteredArr = this.countProductsWithNameContains(this.products, filterBy);
    // return filteredArr;
    return this.products.filter(product =>
      product.productName.toLowerCase().indexOf(filterBy) !== -1);
  }

  private countProductsWithNameContains(products: IProduct[], search: string): IProduct[] {
    const filteredArr = [];
    for (const p of products) {
      if (p.productName.toLowerCase().indexOf(search) !== -1) {
        filteredArr.push(p);
      }
    }
    return filteredArr;
  }


}
