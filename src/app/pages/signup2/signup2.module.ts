import { NgModule } from '@angular/core';
import { Signup2RoutingModule } from './signup2-routing.module';
import { Signup2Component } from './signup2.component';
import { AppSharedModule } from '../../common/index';

@NgModule({
  imports: [
    AppSharedModule,
    Signup2RoutingModule,
  ],
  declarations: [Signup2Component],
  exports: [Signup2Component],
})
export class Signup2Module { }
