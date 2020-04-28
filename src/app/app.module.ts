import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BeerListComponent } from './beers/beer-list/beer-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BeerListItemComponent } from './beers/beer-list/beer-list-item/beer-list-item.component';
import { BeerDetailsComponent } from './beers/beer-details/beer-details.component';
import { RelatedBeersComponent } from './beers/beer-details/related-beers/related-beers.component';
import { BeerDescriptionComponent } from './beers/beer-details/beer-description/beer-description.component';

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    PageNotFoundComponent,
    BeerListComponent,
    BeerListItemComponent,
    BeerDetailsComponent,
    RelatedBeersComponent,
    BeerDescriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModalModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [BeerDetailsComponent]
})
export class AppModule { }
