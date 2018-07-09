import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { pageRoutes } from './routes';

@NgModule({
  imports: [
    RouterModule.forChild(pageRoutes),
  ]
})
export class PageModule { }
