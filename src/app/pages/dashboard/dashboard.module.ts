import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AppSharedModule } from '../../common/index';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    AppSharedModule,
    DashboardRoutingModule,
    TranslateModule
  ],
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
})
export class DashboardModule { }
