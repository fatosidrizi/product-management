import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProductListComponent} from './product-list.component';
import {ProductDetailGuard} from './product-detail.guard';
import {ProductDetailComponent} from './product-detail.component';
import {ProductEditGuard} from './product-edit.guard';
import {ProductEditComponent} from './product-edit.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {path: 'products', component: ProductListComponent},
      {path: 'products/:id', component: ProductDetailComponent},
      {
        path: 'products/new',
        canActivate: [ProductEditGuard],
        component: ProductEditComponent
      },
      {
        path: 'products/:id/edit',
        canActivate: [ProductEditGuard],
        component: ProductEditComponent
      },
    ]),
  ],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
