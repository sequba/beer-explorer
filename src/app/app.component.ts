import { Component } from '@angular/core';

@Component({
  selector: 'bex-root',
  template: `
    <div class="container">
      <bex-page-header></bex-page-header>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {
}
