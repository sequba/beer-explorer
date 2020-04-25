import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BeerListComponent } from './beer-list/beer-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    PageNotFoundComponent,
    BeerListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
