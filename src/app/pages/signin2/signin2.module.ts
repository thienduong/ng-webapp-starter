import { NgModule } from '@angular/core';
import { Signin2RoutingModule } from './signin2-routing.module';
import { Signin2Component } from './signin2.component';
import { AppSharedModule } from '../../common';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    AppSharedModule,
    Signin2RoutingModule,
  ],
  declarations: [Signin2Component],
  exports: [Signin2Component],
})
export class Signin2Module { }
