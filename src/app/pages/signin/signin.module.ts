import { NgModule } from '@angular/core';
import { SigninRoutingModule } from './signin-routing.module';
import { SigninComponent } from './signin.component';
import { AppSharedModule } from '../../common';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    AppSharedModule,
    SigninRoutingModule,
  ],
  declarations: [SigninComponent],
  exports: [SigninComponent],
})
export class SigninModule { }
