import { NgModule } from '@angular/core';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { AppSharedModule } from '../../common/index';

@NgModule({
  imports: [
    AppSharedModule,
    SignupRoutingModule,
  ],
  declarations: [SignupComponent],
  exports: [SignupComponent],
})
export class SignupModule { }
