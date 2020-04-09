import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {WelcomeComponent} from './home/welcome.component';
import {HttpClientModule} from '@angular/common/http';
import {ProductModule} from './products/product.module';
import {AppRoutingModule} from './app-routing.module';
import {CustomerComponent} from './customers/customer.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ProductModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
