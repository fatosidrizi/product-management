import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {WelcomeComponent} from './home/welcome.component';
import {CustomerComponent} from './customers/customer.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: 'welcome', component: WelcomeComponent},
      {path: 'customer', component: CustomerComponent},
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path: '**', redirectTo: 'welcome', pathMatch: 'full'},
    ]),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
