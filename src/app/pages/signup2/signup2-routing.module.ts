import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Signup2Component } from './signup2.component';

const routes: Routes = [
  {
    path: '',
    component: Signup2Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class Signup2RoutingModule { }
