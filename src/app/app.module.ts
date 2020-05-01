import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BeerListComponent } from './beers/beer-list/beer-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BeerListItemComponent } from './beers/beer-list/beer-list-item/beer-list-item.component';
import { BeerDetailsModalComponent } from './beers/beer-details/beer-details-modal/beer-details-modal.component';
import { RelatedBeersComponent } from './beers/beer-details/related-beers/related-beers.component';
import { BeerDescriptionComponent } from './beers/beer-details/beer-description/beer-description.component';
import { BeerDetailsModalContainerComponent } from './beers/beer-details/beer-details-modal-container/beer-details-modal-container.component';
import { DefaultPipe } from './utils/default.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    PageNotFoundComponent,
    BeerListComponent,
    BeerListItemComponent,
    BeerDetailsModalComponent,
    RelatedBeersComponent,
    BeerDescriptionComponent,
    BeerDetailsModalContainerComponent,
    DefaultPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModalModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [BeerDetailsModalComponent]
})
export class AppModule { }
