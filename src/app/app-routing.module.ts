import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BeerListComponent } from './beers/beer-list/beer-list.component';
import { BeerDetailsModalContainerComponent } from './beers/beer-details/beer-details-modal-container/beer-details-modal-container.component';


const routes: Routes = [
  { path: 'page-not-found', component: PageNotFoundComponent },
  {
    path: '',
    component: BeerListComponent,
    children: [
    { path: 'details/:id', component: BeerDetailsModalContainerComponent }
  ]},
  { path: '**', redirectTo: '/page-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
