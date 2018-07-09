import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Signin2Component } from './signin2.component';

const routes: Routes = [
  {
    path: '',
    component: Signin2Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class Signin2RoutingModule { }
